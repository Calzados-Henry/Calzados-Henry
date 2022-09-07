import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

export default function Login() {
    const dispatch = useDispatch();
    const [login, {data, isLoading, isSuccess}] = useLoginMutation();
    
}