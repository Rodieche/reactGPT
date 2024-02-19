import { TranslateResponse } from "../../interfaces";

export const translateUseCase = async (prompt: string, lang: string) => {

    const endpoint = 'translate';

    try{
        const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/${ endpoint }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, lang })
        });
        if ( !resp.ok ) throw new Error('No se pudo realizar la traduccion');

        const { message } = await resp.json() as TranslateResponse;
        console.log(message);

        return{
            ok: true,
            message
        }

    }catch(e){
        return { 
            ok: false,
            message: 'No se pudo traducir'
         }
    }

}