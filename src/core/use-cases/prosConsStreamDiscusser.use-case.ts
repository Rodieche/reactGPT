
export const prosConsStreamUseCase = async (prompt: string) => {

    const endpoint = 'pros-cons-discusser-stream'

    try{
        const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/${ endpoint }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt }),
            // todo: AbortSignal
        });
        if ( !resp.ok ) throw new Error('No se pudo realizar la correción');

        const reader = resp.body?.getReader();
        if(!reader){
            console.log('No se pudo generar el reader')
            return null;
        }

        return reader

        /* const decoder = new TextDecoder();

        let text = '';

        // eslint-disable-next-line no-constant-condition
        while( true ){

            const { value, done } = await reader.read();
            if(done){
                break;
            }

            const decodedChunk = decoder.decode( value, { stream: true } );

            text += decodedChunk;

            console.log(text);

        } */

    }catch(e){
        return null
    }

}