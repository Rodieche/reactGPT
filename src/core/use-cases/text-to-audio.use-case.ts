
export const textToAudioUseCase = async (prompt: string, voice: string) => {

    const endpoint = 'text-to-audio';

    try{
        const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/${ endpoint }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, voice })
        });
        if ( !resp.ok ) throw new Error('No se pudo realizar la generacion del audio');

        const audioFile = await resp.blob();

        const audioUrl = URL.createObjectURL(audioFile);

        return{
            ok: true,
            message: prompt,
            audioUrl
        }

    }catch(e){
        return { 
            ok: false,
            message: 'No se pudo generar el audio'
         }
    }

}