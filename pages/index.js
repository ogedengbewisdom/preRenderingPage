import path from "path";
import fs from "fs/promises"
import Link from "next/link";
const HomePage = (props) => {
  const {products} = props
  return <ul>
    {products.map(item => <li key={item.id}><Link href={`/products/${item.id}`}>{item.title}</Link></li>)}
  </ul>
}

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy_backend.json");
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  if (!data) {
    return {
      redirect : {
        destination: "/no-path"
      }
    }
  }

  if (data.products.length === 0) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      products: data.products
    },
    revalidate: 10
  }
}

export default HomePage;