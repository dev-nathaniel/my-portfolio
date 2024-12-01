import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Pill from "../components/pill/Pill";
import { budgetRanges, deliveryPeriod, services } from "../data";
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


    const onServiceClick = (text) => {
        setService(text)
    }

    const onPeriodClick = (text) => {
        setPeriod(text)
    }

    const onBudgetClick = (text) => {
        setBudget(text)
    }
    return (
        <div>
            <Head>
        <title>Adebayo Olowofoyeku</title>
        <meta name="description" content="Adebayo Olowofoyeku's portfolio. A full stack developer" />
        <link rel="icon" href="/favicon.ico" />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Scope+One&display=swap" rel="stylesheet"></link>
      </Head>
            {/* <Navbar /> */}
            <div className={styles.contactCont}>
                <div className={styles.serviceSec}>
                    <p style={{fontSize: 'calc(1.5rem + 3vw)', marginBottom: '50px'}}>Which of my services do you need?</p>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {services.map((serviceObj, index) => (
                            <Pill state={service} clicked={serviceClicked} setClicked={setServiceClicked} onClick={()=>onServiceClick(serviceObj.title)} text={serviceObj.title} />
                        ))}
                    </ul>
                </div>
                <div className={styles.serviceSec}>
                <p style={{fontSize: 'calc(1.5rem + 3vw)', marginBottom: '50px'}}>What is your budget range?</p>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {budgetRanges.map((budgetObj, index) => (
                            <Pill state={budget} clicked={budgetClicked} setClicked={setBudgetClicked} onClick={()=>onBudgetClick(budgetObj.title)} text={budgetObj.title} />
                        ))}
                    </ul>
                </div>
                <div className={styles.serviceSec}>
                <p style={{fontSize: 'calc(1.5rem + 3vw)', marginBottom: '50px'}}>Project Delivery Period</p>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {deliveryPeriod.map((periodObj, index) => (
                            <Pill state={period} clicked={periodClicked} setClicked={setPeriodClicked} onClick={()=>onPeriodClick(periodObj.title)} text={periodObj.title} />
                        ))}
                    </ul>
                </div>
                <div className={styles.formWrapper}>
                    <p style={{fontSize: 'calc(1.5rem + 3vw)', marginBottom: '50px', textAlign: 'center'}}>Please tell us more.</p>
                    <div className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <label for="full_name">Your Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} name="full_name" type={"text"} />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label for="company">Company</label>
                            <input value={company} onChange={(e) => setCompany(e.target.value)} name="company" type={"text"} />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label for="email">E-mail</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label for="brief">Project brief</label>
                            <textarea value={details} onChange={(e) => setDetails(e.target.value)} cols={30} rows={5} name="brief"></textarea> 
                        </div>
                    </div>
                    <div className={styles.contactButton}>
                        <p>Submit!!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;