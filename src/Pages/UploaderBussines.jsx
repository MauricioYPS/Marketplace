import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { ArrowLeft, UploadCloud, Plus } from 'lucide-react'
import { createProduct, clearCreationState } from '../store/reducers/productsSlice'
import { fetchProductsByUser } from '../store/actions/authActions'

const MAX_IMAGES = 9
const MAX_IMAGE_SIZE = 10 * 1024 * 1024
const ACCEPTED_IMAGE_REGEX = /image\/(png|jpg|jpeg|webp)/i

const API_BASE = 'https://apimarketplace.devmauricioy.com/api'
const S3_FOLDER = 'products'

export default function UploaderBussines() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const creation = useSelector((state) => state.products.creation)

  const [tipo, setTipo] = useState('producto')
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [categoria, setCategoria] = useState('Restaurantes')
  const [publicar, setPublicar] = useState(true)

  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(null)
  const [uploadingToS3, setUploadingToS3] = useState(false)

  const isSubmitting = creation.loading
  const isAuthenticated = Boolean(user?._id)

  const removeFieldError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  useEffect(() => {
    dispatch(clearCreationState())
    return () => {
      dispatch(clearCreationState())
    }
  }, [dispatch])

  useEffect(() => {
    if (!creation.loading && !creation.success && creation.error) {
      setSubmitError(creation.error)
    }
  }, [creation.error, creation.loading, creation.success])

  const previews = useMemo(() => {
    return files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))
  }, [files])

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url))
    }
  }, [previews])

  const handleTipoChange = (value) => {
    setTipo(value)
    if (value === 'servicio') {
      setStock('')
      removeFieldError('stock')
    }
  }

  const validate = () => {
    const next = {}
    if (!nombre.trim()) next.nombre = 'El nombre es requerido.'
    if (!descripcion.trim()) next.descripcion = 'La descripcion es requerida.'

    const priceValue = Number(precio)
    if (precio === '' || Number.isNaN(priceValue) || priceValue < 0) {
      next.precio = 'Ingresa un precio valido (>= 0).'
    }

    if (tipo === 'producto') {
      const stockValue = Number(stock)
      if (stock === '' || Number.isNaN(stockValue) || stockValue < 0) {
        next.stock = 'Ingresa el stock disponible (>= 0).'
      }
    }

    if (files.length === 0) {
      next.files = 'Agrega al menos una imagen.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const incoming = Array.from(event.dataTransfer.files || [])
    if (!incoming.length) return

    const valid = []
    let rejected = false

    incoming.forEach((file) => {
      if (!ACCEPTED_IMAGE_REGEX.test(file.type) || file.size > MAX_IMAGE_SIZE) {
        rejected = true
        return
      }
      valid.push(file)
    })

    if (valid.length) {
      setFiles((prev) => [...prev, ...valid].slice(0, MAX_IMAGES))
      removeFieldError('files')
    }

    if (rejected) {
      setErrors((prev) => ({
        ...prev,
        files: 'Solo se aceptan imagenes PNG, JPG o WEBP de hasta 10MB.',
      }))
    }
  }

  const handleChooseFiles = (event) => {
    const incoming = Array.from(event.target.files || [])
    if (!incoming.length) return

    const valid = []
    let rejected = false

    incoming.forEach((file) => {
      if (!ACCEPTED_IMAGE_REGEX.test(file.type) || file.size > MAX_IMAGE_SIZE) {
        rejected = true
        return
      }
      valid.push(file)
    })

    if (valid.length) {
      setFiles((prev) => [...prev, ...valid].slice(0, MAX_IMAGES))
      removeFieldError('files')
    }

    if (rejected) {
      setErrors((prev) => ({
        ...prev,
        files: 'Solo se aceptan imagenes PNG, JPG o WEBP de hasta 10MB.',
      }))
    }

    event.target.value = ''
  }

  const removeImageAt = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  const uploadImagesToS3 = async (selectedFiles, ownerId) => {
    if (!selectedFiles.length) return []

    const uploadedKeys = []
    for (const file of selectedFiles) {
      const presignResponse = await fetch(`${API_BASE}/s3/presign-upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type || 'application/octet-stream',
          folder: S3_FOLDER,
          userId: ownerId,
        }),
      })

      if (!presignResponse.ok) {
        let details = ''
        try {
          details = await presignResponse.text()
        } catch (error) {
          details = ''
        }
        const reason = details && details.trim() ? `: ${details.trim()}` : ''
        throw new Error(`No se pudo obtener la URL segura para subir ${file.name}${reason}`)
      }

      const { url, key, contentType } = await presignResponse.json()
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': contentType || file.type || 'application/octet-stream' },
        body: file,
      })

      if (!uploadResponse.ok) {
        throw new Error(`No se pudo subir ${file.name} a S3. Intenta nuevamente.`)
      }

      uploadedKeys.push(key)
    }

    return uploadedKeys
  }



  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(null)

    if (!isAuthenticated) {
      setSubmitError('Debes iniciar sesion para publicar un producto.')
      return
    }

    if (!validate()) return

    dispatch(clearCreationState())

    let uploadedKeys = []
    try {
      setUploadingToS3(true)
      uploadedKeys = await uploadImagesToS3(files, user._id)
    } catch (error) {
      const message =
        typeof error === 'string'
          ? error
          : error?.message ?? 'No se pudo subir las imagenes.'
      setSubmitError(message)
      setUploadingToS3(false)
      return
    }

    setUploadingToS3(false)

    const [primaryKey, ...extraKeys] = uploadedKeys

    if (!primaryKey) {
      setErrors((prev) => ({
        ...prev,
        files: 'No se pudo procesar la imagen principal.',
      }))
      return
    }

    try {
      const priceValue = Number(precio)
      const stockValue = tipo === 'servicio' ? 0 : Number(stock)

      const payload = {
        name: nombre.trim(),
        description: descripcion.trim(),
        price: priceValue,
        stock: stockValue,
        photoUrl: primaryKey,
        category: categoria,
        tipe: tipo,
        userId: user._id,
        isPublished: publicar,
      }

      if (extraKeys.length) {
        payload.photos = extraKeys
      }

      await dispatch(createProduct(payload)).unwrap()

      setSubmitSuccess('Tu publicacion se guardo con exito.')
      clearForm(false)
      dispatch(fetchProductsByUser())
    } catch (error) {
      const message =
        typeof error === 'string'
          ? error
          : error?.message ?? 'No se pudo crear el producto.'
      setSubmitError(message)
    }
  }

  const clearForm = (resetFeedback = true) => {
    setTipo('producto')
    setNombre('')
    setDescripcion('')
    setPrecio('')
    setStock('')
    setCategoria('Restaurantes')
    setPublicar(true)
    setFiles([])
    setErrors({})
    setUploadingToS3(false)
    if (resetFeedback) {
      setSubmitError(null)
      setSubmitSuccess(null)
      dispatch(clearCreationState())
    }
  }

  const previewsCount = previews.length

  return (
    <section id="subir-producto" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            Agregar Nuevo {tipo === 'servicio' ? 'Servicio' : 'Producto'}
          </h2>

          <Link
            to="/dashboard"
            className="bg-white text-gray-700 font-semibold py-2 px-5 rounded-full hover:bg-gray-100 transition shadow-sm inline-flex items-center gap-2"
          >
            {/* <ArrowLeft className="w-4 h-4" /> */}
            <span>Volver al Panel</span>
          </Link>
        </div>

        {!isAuthenticated && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-4">
            Debes iniciar sesion para publicar un producto o servicio.
          </div>
        )}

        {submitSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <span className="font-semibold">{submitSuccess}</span>
            <div className="flex gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
                onClick={() => navigate('/profile')}
              >
                Ver mis productos
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-white border border-green-500 text-green-700 text-sm font-semibold hover:bg-green-50 transition"
                onClick={() => {
                  setSubmitSuccess(null)
                  dispatch(clearCreationState())
                }}
              >
                Seguir publicando
              </button>
            </div>
          </div>
        )}

        {submitError && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            {submitError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-lg grid lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="tipo"
                      value="producto"
                      className="accent-orange-600"
                      checked={tipo === 'producto'}
                      onChange={() => handleTipoChange('producto')}
                    />
                    <span>Producto</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="tipo"
                      value="servicio"
                      className="accent-orange-600"
                      checked={tipo === 'servicio'}
                      onChange={() => handleTipoChange('servicio')}
                    />
                    <span>Servicio</span>
                  </label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="new-product-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre del {tipo === 'servicio' ? 'Servicio' : 'Producto'}
                </label>
                <input
                  type="text"
                  id="new-product-name"
                  placeholder={
                    tipo === 'servicio' ? 'Ej: Servicio de Catering' : 'Ej: Carne a la Llanera'
                  }
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value)
                    removeFieldError('nombre')
                  }}
                />
                {errors.nombre && (
                  <p className="text-xs text-red-600 mt-1">{errors.nombre}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="new-product-description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descripcion
              </label>
              <textarea
                id="new-product-description"
                rows={5}
                placeholder={
                  tipo === 'servicio'
                    ? 'Describe tu servicio, condiciones, tiempos, alcance, etc.'
                    : 'Describe tu producto, caracteristicas, ingredientes, etc.'
                }
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value)
                  removeFieldError('descripcion')
                }}
              />
              {errors.descripcion && (
                <p className="text-xs text-red-600 mt-1">{errors.descripcion}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="new-product-price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Precio
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    id="new-product-price"
                    placeholder="25000"
                    className="pl-7 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    value={precio}
                    onChange={(e) => {
                      setPrecio(e.target.value)
                      removeFieldError('precio')
                    }}
                    min="0"
                    step="100"
                  />
                </div>
                {errors.precio && (
                  <p className="text-xs text-red-600 mt-1">{errors.precio}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="new-product-stock"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cantidad (Stock)
                </label>
                <input
                  type="number"
                  id="new-product-stock"
                  placeholder={tipo === 'servicio' ? 'No aplica' : '100'}
                  className={`block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                    tipo === 'servicio' ? 'bg-gray-100 border-gray-200 text-gray-500' : 'border-gray-300'
                  }`}
                  value={tipo === 'servicio' ? '' : stock}
                  onChange={(e) => {
                    setStock(e.target.value)
                    removeFieldError('stock')
                  }}
                  min="0"
                  disabled={tipo === 'servicio'}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Deja en blanco si es un servicio o ilimitado.
                </p>
                {errors.stock && (
                  <p className="text-xs text-red-600 mt-1">{errors.stock}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="new-product-category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Categoria
              </label>
              <select
                id="new-product-category"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option>Restaurantes</option>
                <option>Servicios</option>
                <option>Artesanias</option>
                <option>Moda y Accesorios</option>
                <option>Alimentos y Bebidas</option>
                <option>Hogar y Decoracion</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagenes {tipo === 'servicio' ? 'del Servicio' : 'del Producto'}
              </label>

              <div
                className="bg-gray-50 p-4 rounded-lg border border-dashed"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-2 text-center">
                    {/* <UploadCloud className="mx-auto h-12 w-12 text-gray-400" /> */}
                    <div className="flex flex-col items-center gap-1 text-sm text-gray-600">
                      <label
                        htmlFor="new-file-upload"
                        className="cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500"
                      >
                        <span>Sube un archivo</span>
                        <input
                          id="new-file-upload"
                          name="new-file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/png,image/jpeg,image/jpg,image/webp"
                          onChange={handleChooseFiles}
                        />
                      </label>
                      <p>o arrastra y suelta</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP hasta 10MB. Maximo {MAX_IMAGES} imagenes.
                    </p>
                    {errors.files && (
                      <p className="text-xs text-red-600">{errors.files}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {previewsCount === 0 ? (
                    <>
                      <img
                        src="https://placehold.co/100x100/FF7E5F/FFFFFF?text=Principal"
                        className="rounded-md object-cover w-full h-full aspect-square"
                        alt="placeholder principal"
                      />
                      <img
                        src="https://placehold.co/100x100/FEB47B/FFFFFF?text=Img+2"
                        className="rounded-md object-cover w-full h-full aspect-square opacity-60"
                        alt="placeholder 2"
                      />
                      <div className="w-full h-full aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                        {/* <Plus className="w-6 h-6 text-gray-400" /> */}
                      </div>
                    </>
                  ) : (
                    previews.map((preview, idx) => (
                      <button
                        key={preview.url}
                        type="button"
                        title="Eliminar imagen"
                        onClick={() => removeImageAt(idx)}
                        className="group relative rounded-md overflow-hidden"
                      >
                        <img
                          src={preview.url}
                          className="object-cover w-full h-full aspect-square"
                          alt={`preview-${idx}`}
                        />
                        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />
                        <span className="absolute bottom-1 right-1 text-[10px] bg-white/90 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100">
                          Quitar
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                <span className="font-medium text-gray-700">Publicar</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={publicar}
                    onChange={(e) => setPublicar(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t space-y-3">
              <button
                type="submit"
                disabled={isSubmitting || uploadingToS3 || !isAuthenticated}
                className="w-full py-3 rounded-lg font-semibold bg-gradient-to-tr from-orange-500 to-amber-400 text-white shadow-sm hover:opacity-95 active:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {uploadingToS3
                  ? 'Subiendo imagenes...'
                  : isSubmitting
                    ? 'Guardando...'
                    : `Guardar ${tipo === 'servicio' ? 'Servicio' : 'Producto'}`}
              </button>
              <button
                type="button"
                onClick={() => clearForm()}
                className="w-full text-center text-sm text-gray-600 hover:text-red-600 transition"
              >
                Descartar Cambios
              </button>
            </div>
          </div>
        </form>

        {Object.keys(errors).length > 0 && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg p-4">
            <p className="font-semibold mb-1">Por favor corrige:</p>
            <ul className="list-disc list-inside space-y-0.5">
              {Object.entries(errors).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
