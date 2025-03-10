import { useRouter } from 'next/router'
import SingleBookPage from '@/components/SingleBookPage'
import ClientOnly from "@/components/ClientOnly";
import LoadAuthors from "@/pages/authors/LoadAuthors";
import useAuthorStore from '@/store/authorStore';

export default function Page() {
    const router = useRouter()
    const bookID = router.query.slug
    const { authors } = useAuthorStore();
    return (<>
        <ClientOnly>
            <SingleBookPage bookID={bookID} />
        </ClientOnly>
        {authors.length == 0? <LoadAuthors />:<></>}
    </>
    )


}