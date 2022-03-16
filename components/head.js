import Head from 'next/head';

export default function CreateHead({page}){
    return(
        <Head>
            <title>{page} | MountCrypto</title>
            <meta name="description" content={`MountCrypto - ${page}`} />
            <link rel="icon" href="/images/mountaintop.png" />
        </Head>
    )
}