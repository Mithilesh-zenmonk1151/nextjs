import {notFound} from "next/navigation"
function getRandomInt(count: number){
  return Math.floor(Math.random()* count);
}
export default function ReviewDetails({params}:{
    params:{
      productId?:string;
      reviewId?:string;

    }
}){
    return <h1> review{params.reviewId} for product{params.productId}</h1>
}
