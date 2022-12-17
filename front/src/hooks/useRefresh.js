import Cookies from "js-cookie";
import { useEffect } from "react";
import useAuth from "../states/useAuth"
import decodeJwt from "../utils/decodeJwt";
import axios from "axios"


const useRefresh = () => {
    const setAuth = useAuth((state) => state.setAuth)
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    const refreshTokenFunction = async (token) => {
        try {
            const { data } = await axios.post("http://localhost:5000/refresh",{ refreshToken: token })
            const payload = decodeJwt(data.accessToken);
            setAuth({
                name: payload.name,
                _id: payload._id,
                email: payload.email,
                isAuth: true,
            });
            Cookies.set("accessToken", data.accessToken)
            Cookies.set("refreshToken", data.refreshToken)
        } catch (err) {
            alert(err)
        }
    }


    useEffect(() => {
        (async () => {
            if (accessToken && refreshToken) {
                const payload = decodeJwt(accessToken);
                if (payload && typeof payload === "object") {
                  setAuth({
                    name: payload.name,
                    _id: payload._id,
                    email: payload.email,
                    isAuth: true,
                  });
                }else if(payload && typeof payload === "string"){
                    await refreshTokenFunction(refreshToken)      
                }
            }else if(!accessToken && refreshToken){
                await refreshTokenFunction(refreshToken)
            }
        })()
    },[])

}

export default useRefresh