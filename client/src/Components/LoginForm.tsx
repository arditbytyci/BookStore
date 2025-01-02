import React, { useState } from "react";

const LoginForm: React.FC<{ onLogin: (token: string) => void}> = ({onLogin}) => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent)




  return <div>LoginForm</div>;
};

export default LoginForm;
