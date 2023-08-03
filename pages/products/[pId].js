import path from "path";
import fs from "fs/promises";

const EventDetailPage = (props) => {
    const {products} = props;
    if (!products) {
        return <p>Loading ...</p>
    }

    return (
        <div>
            <h3>{products.title}</h3>
            <h5>{products.description}</h5>
        </div>
    )
}

const getData = async () => {
    const filePath = path.join(process.cwd(), "data", "dummy_backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export const getStaticProps = async (context) => {

    const {params} = context;
    const productId = params.pId;
    const data = await getData();
    const product = data.products.find(item => item.id === productId);
    if (!product) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            products: product
        }
    }
}

export const getStaticPaths = async () => {
    const data = await getData();
    const pathsWithParams = data.products.map(item => ({params: {pId: item.id}}));
    return {
        paths: pathsWithParams,
        fallback: true
    }
}

export default EventDetailPage;