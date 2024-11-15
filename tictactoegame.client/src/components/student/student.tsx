import { useState } from "react";

export interface items{
    item: []
}

export default function ItemList()  {
    const [items,setItems] = useState(null);
    
    useEffect(()=>{
     fetch("https://jsonplaceholder.org/posts")
     .then(res=>res.json())
     .then(data=>setItems(data))
    },[items]);
}