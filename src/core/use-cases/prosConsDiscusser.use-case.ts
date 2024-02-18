import { ProsConsResponse } from "../../interfaces";

export const prosConsUseCase = async (prompt: string) => {

    const endpoint = 'pros-cons-discusser'

    try{
        const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/${ endpoint }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        if ( !resp.ok ) throw new Error('No se pudo realizar la comparacion');

        const data = await resp.json() as ProsConsResponse;

        return{
            ok: true,
            ...data
        }

    }catch(e){
        return { 
            ok: false,
            content: 'No se pudo realizar la comparacion'
         }
    }

}