"use client"

export default function ErrorBoundry({error,reset}:{
    error: Error; reset:()=> void
}){
    return <div>
       {error.message}
       <button>Try again</button>
    </div>
}
