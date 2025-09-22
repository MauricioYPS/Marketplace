import { useEffect, useState } from "react";
import Header from "../Props/Header";
import Body from "../Props/Body";
import Footer from "../Props/Footer";
import { useDispatch } from "react-redux";
import { setUser } from "../store/actions/authActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const loginWithToken = async (token) => {
    try {
        console.log("se ejecuto loginWithToken");

        const response = await axios.get("http://localhost:8080/api/users/validationToken",
            {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
        return response.data.response

    } catch (error) {
        console.log("error", error);

    }
}

export default function Home() {


    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            localStorage.setItem("token", token);
            loginWithToken(token).then((user) => {
                dispatch(setUser({ user, token }))
            })
        }

        navigate("/")

    }
        , [dispatch])


    return (<>
        <Body></Body>
    </>)
}