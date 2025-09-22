import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthFeedback } from "../store/actions/authActions";

const LogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-primary h-10 w-10"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const initialFormState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  photoUrl: "",
  role: "1",
  age: "",
  phone: "",
};

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, registrationSuccess, token, fieldErrors } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState(initialFormState);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (token) {
      navigate("/profile", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthFeedback());
    };
  }, [dispatch]);

  useEffect(() => {
    if (registrationSuccess) {
      setFormData(initialFormState);
      setFormError(null);
    }
  }, [registrationSuccess]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (error || formError || message || fieldErrors) {
      dispatch(clearAuthFeedback());
      setFormError(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedLastName = formData.lastName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhotoUrl = formData.photoUrl.trim();
    const roleValue = parseInt(formData.role, 10);
    const ageValue = parseInt(formData.age, 10);
    const phoneDigits = formData.phone.replace(/[^0-9]/g, "");
    const phoneValue = Number(phoneDigits);

    if (!trimmedPhotoUrl) {
      setFormError("La URL de la foto es obligatoria");
      return;
    }

    if ([roleValue, ageValue].some((value) => Number.isNaN(value))) {
      setFormError("Edad y rol deben ser numeros validos");
      return;
    }

    if (roleValue <= 0) {
      setFormError("Selecciona un rol valido");
      return;
    }

    if (!phoneDigits || Number.isNaN(phoneValue) || phoneDigits.length < 7) {
      setFormError("Ingresa un numero de telefono valido");
      return;
    }

    if (ageValue <= 0) {
      setFormError("Ingresa una edad valida");
      return;
    }

    const payload = {
      name: trimmedName,
      lastName: trimmedLastName,
      email: trimmedEmail,
      password: formData.password,
      photoUrl: trimmedPhotoUrl,
      role: roleValue,
      age: ageValue,
      phone: phoneValue,
      online: true,
    };

    dispatch(register(payload));
  };

  return (
    <section className="container mx-auto py-16 px-4">
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-xl border">
          <div className="text-center mb-6">
            <Link to="/" className="flex items-center justify-center space-x-2">
              <LogoIcon />
              <span className="text-3xl font-bold text-primary">
                Mercado<span className="text-accent">Local</span>
              </span>
            </Link>
            <p className="text-gray-600 mt-2">
              Unete a la comunidad digital de Mapiripan
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <div className="relative mt-1">
                  <UserIcon />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Tu nombre"
                    autoComplete="given-name"
                    required
                  />
                </div>
                {fieldErrors?.name && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido
                </label>
                <div className="relative mt-1">
                  <UserIcon />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Tu apellido"
                    autoComplete="family-name"
                    required
                  />
                </div>
                {fieldErrors?.lastName && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.lastName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electronico
                </label>
                <div className="relative mt-1">
                  <MailIcon />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    required
                  />
                </div>
                {fieldErrors?.email && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contrasena
                </label>
                <div className="relative mt-1">
                  <LockIcon />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Crea una contrasena segura"
                    autoComplete="new-password"
                    required
                  />
                </div>
                {fieldErrors?.password && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.password}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="photoUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Foto de perfil (URL)
                </label>
                <input
                  type="url"
                  id="photoUrl"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="https://..."
                  required
                />
                {fieldErrors?.photoUrl && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.photoUrl}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Edad
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Tu edad"
                  min="1"
                  required
                />
                {fieldErrors?.age && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.age}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Telefono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Numero de contacto"
                  pattern="[0-9]+"
                  required
                />
                {fieldErrors?.phone && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rol
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                >
                  <option value="1">Consumidor</option>
                  <option value="2">Vendedor</option>
                  <option value="3">Administrador</option>
                </select>
                {fieldErrors?.role && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.role}</p>
                )}
              </div>
            </div>

            {formError && (
              <p className="text-sm text-red-500 text-center">{formError}</p>
            )}

            {error && !formError && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {registrationSuccess && !error && !formError && (
              <p className="text-sm text-green-600 text-center">
                {message ?? "Registro exitoso. Ahora puedes iniciar sesion."}
              </p>
            )}

            {!registrationSuccess && message && !error && !formError && (
              <p className="text-sm text-green-600 text-center">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-primary font-bold text-lg py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-accent"
            >
              Inicia sesion
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
