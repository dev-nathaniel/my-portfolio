import Head from "next/head";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Pill from "../components/pill/Pill";
import { budgetRanges, deliveryPeriod, services } from "../data";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/contactStyles/contact.module.css'

const Contact = () => {
    const [service, setService] = useState()
    const [budget, setBudget] = useState()
    const [period, setPeriod] = useState()
    const [name, setName] = useState()
    const [company, setCompany] = useState()
    const [email, setEmail] = useState()
    const [details, setDetails] = useState()
    const [serviceClicked, setServiceClicked] = useState(false)
    const [budgetClicked, setBudgetClicked] = useState(false)
    const [periodClicked, setPeriodClicked] = useState(false)
    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false); // Added to track if the form has been submitted
    const [loading, setLoading] = useState(false); // Added to track if the form is submitting

    useEffect(() => {
        setFormSubmitted(false); // Reset formSubmitted when any of the inputs change
    }, [service, budget, period, name, company, email, details]);

    const onServiceClick = (text) => {
        setService(text)
    }

    const onPeriodClick = (text) => {
        setPeriod(text)
    }

    const onBudgetClick = (text) => {
        setBudget(text)
    }

    const validateForm = () => {
        console.log('here')
        let errors = {};
        if (!name) errors.name = "Name is required";
        if (!email) errors.email = "Email is required";
        if (!service) {
            errors.service = "Service is required";
            toast.error('Service is required');
        }
        if (!budget) {
            errors.budget = "Budget is required";
            toast.error('Budget is required');
        }
        if (!period) {
            errors.period = "Delivery Period is required";
            toast.error('Delivery Period is required');
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = async (e) => {
        console.log('hereeeeeee')
        e.preventDefault();
        if (!validateForm()) return;
        if (formSubmitted) {
            toast.info('Form has already been sent!');
            return;
        }
        setLoading(true); // Start loading animation
        try {
            const response = await axios.post('https://my-portfolio-backend-8401.onrender.com/sendEmail', {
                name,
                company,
                email,
                service,
                budget,
                period,
                details
            });
            toast.success('Email sent successfully!');
            console.log(response.data);
            setFormSubmitted(true); // Set formSubmitted to true after successful submission
            setLoading(false); // Stop loading animation
            // Handle success response
        } catch (error) {
            toast.error('Error sending email!');
            console.error(error);
            setLoading(false); // Stop loading animation
            // Handle error response
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Head>
                <title>Adebayo's Contact</title>
                <meta name="description" content="Adebayo Olowofoyeku's portfolio. A full stack developer" />
                <link rel="icon" href="/favicon.ico" />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Scope+One&display=swap" rel="stylesheet"></link>
            </Head>
            {/* <Navbar /> */}
            <div className={styles.contactCont}>
                <div className={styles.serviceSec}>
                    <p style={{ fontSize: 'calc(1.5rem + 3vw)', marginBottom: '50px' }}>Which of my services do you need?</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {services.map((serviceObj, index) => (
                            <Pill state={service} clicked={serviceClicked} setClicked={setServiceClicked} onClick={() => onServiceClick(serviceObj.title)} text={serviceObj.title} />
                        ))}
                    </ul>
                </div>
                <div className={styles.serviceSec}>
                    <p style={{ fontSize: 'calc(1.5rem + 3vw)', marginBottom: '50px' }}>What is your budget range?</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {budgetRanges.map((budgetObj, index) => (
                            <Pill state={budget} clicked={budgetClicked} setClicked={setBudgetClicked} onClick={() => onBudgetClick(budgetObj.title)} text={budgetObj.title} />
                        ))}
                    </ul>
                </div>
                <div className={styles.serviceSec}>
                    <p style={{ fontSize: 'calc(1.5rem + 3vw)', marginBottom: '50px' }}>Project Delivery Period</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {deliveryPeriod.map((periodObj, index) => (
                            <Pill state={period} clicked={periodClicked} setClicked={setPeriodClicked} onClick={() => onPeriodClick(periodObj.title)} text={periodObj.title} />
                        ))}
                    </ul>
                </div>
                <div className={styles.formWrapper}>
                    <p style={{ fontSize: 'calc(1.5rem + 3vw)', marginBottom: '50px', textAlign: 'center' }}>Please tell us more.</p>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputWrapper}>
                            <label for="full_name">Your Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} name="full_name" type={"text"} required />
                            {formErrors.name && <div style={{ color: 'red' }}>{formErrors.name}</div>}
                        </div>
                        <div className={styles.inputWrapper}>
                            <label for="company">Company</label>
                            <input value={company} onChange={(e) => setCompany(e.target.value)} name="company" type={"text"} />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label for="email">E-mail</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" required />
                            {formErrors.email && <div style={{ color: 'red' }}>{formErrors.email}</div>}
                        </div>
                        <div className={styles.inputWrapper}>
                            <label for="brief">Project brief</label>
                            <textarea value={details} onChange={(e) => setDetails(e.target.value)} cols={30} rows={5} name="brief"></textarea>
                        </div>
                        {/* <div className={styles.contactButton}> */}
                        <button className={styles.contactButton} type="submit" disabled={loading}>{loading ? 'Sending...' : 'Submit!!'}</button>
                        {/* </div> */}
                    </form>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Contact;