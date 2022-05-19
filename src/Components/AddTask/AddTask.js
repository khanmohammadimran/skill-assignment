import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import MyItems from '../MyItems/MyItems';
import toast, { Toaster } from 'react-hot-toast';

const AddTask = () => {
    const { register, handleSubmit } = useForm();
    const [services, setService] = useState([]);
    const [isReload, setReload] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/service')
            .then(res => res.json())
            .then(data => setService(data))
    }, [isReload])



    const onSubmit = data => {
        console.log(data);
        const url = `http://localhost:5000/service`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                setReload(!isReload)
            })
    }

    // test 
    // const handleClick = event => {
    //     if (event.target.style.textDecoration) {
    //         event.target.style.removeProperty('text-decoration');
    //     } else {
    //         event.target.style.setProperty('text-decoration', 'line-through');
    //     }
    // };
    // test 


    // test 
    const handleClick = event => {
        toast.success('Successfully Added!')
        if (event.target.style.textDecoration) {
            event.target.style.removeProperty('text-decoration');
        } else {
            event.target.style.setProperty('text-decoration', 'line-through');
        }
    };
    // test 

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            const url = `http://localhost:5000/service/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const remaining = services.filter(service => service._id !== id)
                    setService(remaining)
                })
        }
    }

    return (
        <div>
            <div className='w-1/2 mx-auto'>
                <h2 className='text-3xl text-center py-8'>Add Your Task</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-1'>
                    <input type="text" placeholder="Task Name" class="input input-bordered input-accent w-full" {...register("name", { required: true, maxLength: 20 })} />
                    <br />
                    <textarea class="textarea textarea-accent w-full" placeholder="Description" {...register("description")}></textarea>
                    <br />
                    <input className='btn btn-secondary' type="submit" value="Add Task" />
                </form>
            </div>
            <h2 className='text-center text-3xl py-4 font-bold'>Total task till now: {services.length}</h2>
            <div className='grid lg:grid-cols-3 sm:grid-cols-1'>
                {/* <MyItems></MyItems> */}
                {
                    services.map(service => <div
                        className='py-4'
                        key={service._id}>
                        <div class="card w-96 bg-neutral text-neutral-content">
                            <div class="card-body items-center text-center">
                                <h2 class="card-title">{service.name}</h2>
                                <p>{service.description}</p>
                                <div class="card-actions justify-end">
                                    <button onClick={handleClick} class="btn btn-primary">Complete</button>
                                    <Toaster />
                                    <button onClick={() => handleDelete(service._id)} class="btn btn-ghost">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AddTask;