import { useRouter } from 'next/router'
import SingleBookPage from '@/components/SingleBookPage'
import ClientOnly from "@/components/ClientOnly";
import LoadAuthors from "@/pages/authors/LoadAuthors";

export default function Page() {
    const router = useRouter()
    const bookID = router.query.slug
    return (<>
        <LoadAuthors />
        <ClientOnly>
            <SingleBookPage bookID={bookID} />
        </ClientOnly>
    </>
    )


}