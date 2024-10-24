import Form from 'react-bootstrap/Form';
import { useEffect, useState, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Index() {
  const [tab, setTab] = useState({
        sort_by: false,
        prop_type: false,
        price_range: false,
        distance: false,
        storage: false,
        time_duration: false,
        space_dimension: false,
        rating: false
    });
    const options = {
        sort_by: false,
        prop_type: false,
        price_range: false,
        distance: false,
        storage: false,
        time_duration: false,
        space_dimension: false,
        rating: false
    }

    const [contentDiv, setContentDiv] = useState(false);
    const divRef = useRef(null);
    useEffect(() => {
        for (var mykey in tab) {
            if (tab[mykey] === true) {
                setContentDiv(true)
            }
        }
        function handleClickOutside(event) {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setContentDiv(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [tab]);

  


    return (
        <>
            <div className="parent">
                <div className="slider">
                    <button className='btns flex item-center justify-center' style={{ background: "#8DC63F" }} onClick={() => setTab({ ...options, sort_by: true })}>Sort by {tab.sort_by ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
                    <button className='btns flex item-center justify-center' onClick={() => setTab({ ...options, prop_type: true })}>Property type {tab.prop_type ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
                    <button className='btns flex item-center justify-center' onClick={() => setTab({ ...options, price_range: true })}>Price range {tab.price_range ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
                    <button className='btns flex item-center justify-center' onClick={() => setTab({ ...options, distance: true })}>Distance {tab.distance ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
                    <button className='btns flex item-center justify-center' onClick={() => setTab({ ...options, storage: true })}>Storage type {tab.storage ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
                    <button className='btns flex item-center justify-center' onClick={() => setTab({ ...options, time_duration: true })}>Time duration {tab.time_duration ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
                    <button className='btns flex item-center justify-center' onClick={() => setTab({ ...options, space_dimension: true })}>Space dimension {tab.space_dimension ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
                    <button className='btns flex item-center justify-center' onClick={() => setTab({ ...options, rating: true })}>Rating {tab.rating ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
                </div>


                {
                    contentDiv &&
                    <div className={`content shadow`} ref={divRef}>
                        {tab.sort_by && <div className="sort-by-popup"></div>}

                        {tab.prop_type && <div className="property-type">
                            <Form>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3 flex flex-col">
                                        <Form.Check
                                            inline
                                            label="Household Items"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                        />
                                        <Form.Check
                                            inline
                                            label="Business Items"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                        />
                                    </div>
                                ))}
                            </Form>
                        </div>

                        }
                        {tab.price_range &&
                            <div className="price-range">
                                <Form>
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3 flex justify-items-between">
                                            <div className='grid place-items-start'>
                                                <Form.Check
                                                    inline
                                                    label="1 - 1000"
                                                    name="group1"
                                                    type={type}
                                                    id={`inline-${type}-1`}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="5000 - 20000"
                                                    name="group1"
                                                    type={type}
                                                    id={`inline-${type}-2`}
                                                />
                                            </div>
                                            <div className='grid place-items-start'>
                                                <Form.Check
                                                    inline
                                                    label="1000 - 5000"
                                                    name="group1"
                                                    type={type}
                                                    id={`inline-${type}-2`}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="20000 - 50000"
                                                    name="group1"
                                                    type={type}
                                                    id={`inline-${type}-2`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </Form>

                                <form className='flex items-center justify-items-center'>
                                    <input type="text" placeholder=" ₹ Min" className='h-[40px] w-[150px] outline-none border-2 rounded-lg' />
                                    <input type="text" placeholder=" ₹ Max" className='h-[40px] w-[150px] outline-none border-2 rounded-lg' />
                                    <button type="submit"><span className='bg-blue-500 h-[40px] w-[50px] rounded-lg'><FaArrowRightLong className='text-white w-[40px]' /></span></button>
                                </form>
                            </div>
                        }
                        {
                            tab.storage &&
                            <div className="storage-type">
                                <Form>
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3 flex flex-col">
                                            <Form.Check
                                                inline
                                                label="Independent"
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-1`}
                                            />
                                            <Form.Check
                                                inline
                                                label="Shared"
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-2`}
                                            />
                                        </div>
                                    ))}
                                </Form>
                            </div>
                        }
                        {tab.time_duration &&
                            <div className="time-duration">
                                <input onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = "text"} placeholder='From' className='h-[40px] w-[150px] outline-none border-2 rounded-lg' />
                                <input onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = "text"} placeholder='To' className='h-[40px] w-[150px] outline-none border-2 rounded-lg' />
                            </div>
                        }
                        {
                            tab.distance &&
                            <div className="distance">
                                <p>(in Km)</p>
                                <input type="range" className='myrange' /><br />
                                <input type="text" placeholder=" ₹ Min" className='h-[40px] w-[150px] outline-none border-2 rounded-lg' />
                            </div>
                        }
                        {
                            tab.space_dimension &&
                            <div className="space-dimension">
                                <Form>
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3 flex flex-col">
                                            <Form.Check
                                                inline
                                                label="300-600 sq ft. (1BHK)"
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-1`}
                                            />
                                            <Form.Check
                                                inline
                                                label="600-1000 sq ft. (2BHK)"
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-2`}
                                            />
                                            <Form.Check
                                                inline
                                                label="900-1500 sq ft. (3BHK)"
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-2`}
                                            />
                                            <Form.Check
                                                inline
                                                label="1200-2000 sq ft. (4BHK)"
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-2`}
                                            />
                                            <Form.Check
                                                inline
                                                label="Other"
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-2`}
                                            />
                                        </div>
                                    ))}
                                </Form>
                            </div>
                        }

                        {tab.rating &&
                            <div className="rating">
                                <Form>
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3 flex flex-row items-center justify-items-between">
                                            <div className='flex flex-col'>
                                                <Form.Check
                                                    inline
                                                    label="All Ratings"
                                                    name="group1"
                                                    type={type}
                                                    id={`inline-${type}-1`}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="5 Stars"
                                                    name="group1"
                                                    type={type}
                                                    id={`inline-${type}-2`}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="2 Stars"
                                                    name="group1"
                                                    type={type}
                                                    id={`inline-${type}-2`}
                                                />
                                            </div>
                                            <div className='flex flex-col'>
                                                <Form.Check
                                                    inline
                                                    label="4 Stars"
                                                    name="group1"
                                                    type={type}
                                                    id={`inline-${type}-2`}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="3 Stars"
                                                    name="group1"
                                                    type={type}
                                                    id={`inline-${type}-2`}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="1 Star"
                                                    name="group1"
                                                    type={type}
                                                    id={`inline-${type}-2`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </Form>
                            </div>
                        }
                    </div>
                }
            </div>
        </>
    )
}
