import React, { useEffect, useState } from 'react';

const MyItems = () => {
    const [services, setService] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/service')
            .then(res => res.json())
            .then(data => {
                setService(data)
            })
    }, [])

    return (
        <div>
            {
                services.map(service => <div
                    key={service._id}>
                    <div class="card w-96 bg-neutral text-neutral-content">
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">{service.name}</h2>
                            <p>{service.description}</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary">Accept</button>
                                <button class="btn btn-ghost">Deny</button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default MyItems;