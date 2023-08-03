import { Fragment, useEffect, useState } from "react";
import useSWR from "swr"

const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.data);
    // const [isLoading, setIsLoading] = useState(false);
    // const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const fetcher = (url) => fetch(url).then((res) => res.json());
    // const fetcher = async (url) => {
    //     const response = await fetch(url)
    //     const data = await response.json()
    //     return data
    // }
    const {data, error} = useSWR(`https://nextjs-e65fb-default-rtdb.firebaseio.com/sales.json`, fetcher);

    useEffect(() => {
        if(data) {
            const transformedData = []
            for (const key in data) {
                transformedData.push({
                    id: key, 
                    username: data[key].username, 
                    volume: data[key].volume
                });
            }
            setSales(transformedData)
        }
        
    }, [data])
    // const fetchData = async () => {
    //     setIsLoading(true)
    //     const response = await fetch(`https://nextjs-e65fb-default-rtdb.firebaseio.com/sales.json`);
    //     const resData = await response.json();
    //     const transformedData = []
    //     for (const key in resData) {
    //         transformedData.push({id: key, username: resData[key].username, volume: resData[key].volume})
    //     }
    //     setSales(transformedData)
    //     setIsLoading(false)
    // } 
    // useEffect( () => {
    //     fetchData()
    // }, [])
    if (error) {
        return <p>Failed to Load Data</p>
    }

    if (!data && !sales) {
        return <p>Loading...</p>
    }
    
    return (
        <Fragment>
            {/* <button onClick={fetchData}>fetchData</button> */}
            {/* <ul>
                {data.map(item => <li key={item.id}>{item.username} - ${item.volume}</li>)}
            </ul> */}
            <ul>
                {sales.map(item => <li key={item.id}>{item.username} - ${item.volume}</li>)}
            </ul>
        </Fragment>
    )
}

// export const getServerSideProps = async () => {
  
//         const response = await fetch(`https://nextjs-e65fb-default-rtdb.firebaseio.com/sales.json`);
//         const resData = await response.json();
//         const transformedData = []
//         for (const key in resData) {
//             transformedData.push({id: key, username: resData[key].username, volume: resData[key].volume})
//         }
   
 
//     return {
//         props: {
//             data: transformedData
//         }
//     }
// }

export const getStaticProps = async () => {
  
        const response = await fetch(`https://nextjs-e65fb-default-rtdb.firebaseio.com/sales.json`);
        const resData = await response.json();
        const transformedData = []
        for (const key in resData) {
            transformedData.push({id: key, username: resData[key].username, volume: resData[key].volume})
        }
   
 
    return {
        props: {
            data: transformedData
        }
    }
}
export default LastSalesPage;