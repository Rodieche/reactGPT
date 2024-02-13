import { OrthographyResponse } from "../../interfaces";

export const orthographyUseCase = async (prompt: string) => {

    try{
        const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/orthography-check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        if ( !resp.ok ) throw new Error('No se pudo realizar la correción');

        const data=await resp.json() as OrthographyResponse;

        return{
            ok: true,
            ...data
        }

    }catch(e){
        return { 
            ok: false,
            userScore: 0,
            errors: [],
            message: 'No se puede realizar la correccion'
         }
    }

}