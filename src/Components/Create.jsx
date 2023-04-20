import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate=useNavigate();
    const [title,setTitle]=useState('')
    const [body,setBody]=useState('')
    const [author,setAuthor]=useState('mario')
    const [isPending,setIsPending]=useState(false)
    
    
    function handleSubmit(e) {
        e.preventDefault()
        const blog={title,body,author}
        // console.log(blog)
        setIsPending(true)
        fetch("http://localhost:8000/blogs",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(blog)
        }).then(()=>{
            console.log("new blog added");
            setIsPending(false)
            navigate('/')
        })
    }
    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title</label>
                <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <label>Blog Body</label>
                <input 
                    type="text" 
                    required 
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}
                />
                <select
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                >
                    <option value="mario">Mario</option>
                    <option value="yushi">Yushi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
    );
}
export default Create;