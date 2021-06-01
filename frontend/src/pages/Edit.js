import React, { useState, useEffect } from 'react'
import Header from '../components/Header'


import api from '../services/api'

export default function Edit({ match, history }){
    const [person, setPerson] = useState('')
    useEffect(() => {
        async function loadPerson(){
            const id = match.params.id
            const response = await api.post('/show', {
                id
            })
            setPerson(response.data)
        }
        loadPerson()
        
    }, [match.params.id])


    const [RazaoSocial, setRazaoSocial] = useState()
    const [Endereco, setEndereco] = useState()
    const [Email, setEmail] = useState()
    const [Telefone1, setTelefone1] = useState()
    const [Telefone1Contato, setTelefone1Contato] = useState()
    const [Telefone2, setTelefone2] = useState()
    const [Telefone2Contato, setTelefone2Contato] = useState()
    const [Telefone3, setTelefone3] = useState()
    const [Telefone3Contato, setTelefone3Contato] = useState()
    const [Telefone4, setTelefone4] = useState()
    const [Telefone4Contato, setTelefone4Contato] = useState()
    const [Telefone5, setTelefone5] = useState()
    const [Telefone5Contato, setTelefone5Contato] = useState()
    const [Observacoes, setObservacoes] = useState()

    async function handleSubmit(e){
        e.preventDefault()
        const id = match.params.id
        const response = await api.post('/update', {
            id,
            RazaoSocial,
            Endereco,
            Email,
            Telefone1,
            Telefone1Contato,
            Telefone2,
            Telefone2Contato,
            Telefone3,
            Telefone3Contato,
            Telefone4,
            Telefone4Contato,
            Telefone5,
            Telefone5Contato,
            Observacoes
        })

        console.log(response)

        history.push('/')
    }

    

    return (
        <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet" />
        <Header />

            <form onSubmit={handleSubmit}>
            <input type="text" defaultValue={person.RazaoSocial} onChange={e => setRazaoSocial(e.target.value)} />
            <input type="text" defaultValue={person.Telefone1} onChange={e => setTelefone1(e.target.value)} />
            <input type="text" defaultValue={person.Telefone1Contato} onChange={e => setTelefone1Contato(e.target.value)} />
            <input type="text" defaultValue={person.Telefone2} onChange={e => setTelefone2(e.target.value)} />
            <input type="text" defaultValue={person.Telefone2Contato} onChange={e => setTelefone2Contato(e.target.value)} />
            <input type="text" defaultValue={person.Telefone3} onChange={e => setTelefone3(e.target.value)} />
            <input type="text" defaultValue={person.Telefone3Contato} onChange={e => setTelefone3Contato(e.target.value)} />
            <input type="text" defaultValue={person.Telefone4} onChange={e => setTelefone4(e.target.value)} />
            <input type="text" defaultValue={person.Telefone4Contato} onChange={e => setTelefone4Contato(e.target.value)} />
            <input type="text" defaultValue={person.Telefone5} onChange={e => setTelefone5(e.target.value)} />
            <input type="text" defaultValue={person.Telefone5Contato} onChange={e => setTelefone5Contato(e.target.value)} />
            <input type="text" defaultValue={person.Email} onChange={e => setEmail(e.target.value)} />
            <input type="text" defaultValue={person.Endereco} onChange={e => setEndereco(e.target.value)} />
            <input type="text" defaultValue={person.Observacoes} onChange={e => setObservacoes(e.target.value)} />
            <button type="submit">ENVIAR</button>
            </form>

            
        </div>
    )
}
