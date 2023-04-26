import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

import avatarPlaceholder from "../../assets/avatar_placeholder.svg"

import { FiLock } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";

import { Container, Form, Avatar } from "./styles";
import { Input } from "../../components/Input";
import { ButtonLink } from "../../components/ButtonLink";
import { Button } from "../../components/Button";


export function Profile() {
    const {user, updateProfile} = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);


    const navigate = useNavigate();

    function handleBack(){
        navigate(-1);
    }

    async function handleUpdate(){
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld,
        };

        const userUpdated = Object.assign(user, updated);

        await updateProfile({ user, avatarFile });
        navigate("/")
    }

    function handleChangeAvatar(event){
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);

    }

    return(
        <Container>
            <header>
        
            <ButtonLink 
             title="Voltar"
             icon={FiArrowLeft}
             onClick={handleBack}
            />
            
            </header>

            <Avatar>
            <img
             className="avatar" 
             src={avatar}
             alt="Foto do usuário" /> 

            <label
             htmlFor="avatar">
            <FiCamera />
            <input
             id="avatar"
             type="file"
             onChange={handleChangeAvatar}/>
            </label>
            </Avatar>

           <Form>
           <Input
             placeholder="Nome" 
             type="text"
             icon={FiUser}
             value={name}
             onChange={e => setName(e.target.value)}
             />

            <Input
             placeholder="E-mail"
             type="text"
             icon={FiMail}
             value={email}
             onChange={e => setEmail(e.target.value)}
             />

            <Input
             placeholder="Senha atual"
             icon={FiLock}
             onChange={e => setPasswordOld(e.target.value)}
             />

            <Input
             placeholder="Nova senha" 
             icon={FiLock}
             onChange={e => setPasswordNew(e.target.value)}
             />

            <Button
             title="Salvar"
             onClick={handleUpdate}
             />
           </Form>

        </Container>
    )
}