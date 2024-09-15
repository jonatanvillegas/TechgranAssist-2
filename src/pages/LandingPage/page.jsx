import React from 'react'
import Navbar from './_components/Navbar'

const page = () => {
    return (
        <>
        <Navbar/>
            <section className="bg-gray-50">
                <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-xl text-center">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            Understand User Flow.
                            <strong className="font-extrabold text-green-medium sm:block"> Increase Conversion. </strong>
                        </h1>

                        <p className="mt-4 sm:text-xl/relaxed">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
                            numquam ea!
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a
                                className="block w-full rounded bg-green-medium px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-dark focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                                href="/login"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page
