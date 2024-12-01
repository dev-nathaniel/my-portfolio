import styles from '../styles/homeStyles/About.module.css'

const About = () => {
    return (
        <section id="about" className={styles.about}>
            <div className={styles.aboutContainer}>
                    {/* <svg className={styles.aboutBox} width="450" height="450" viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect id='svg' x="4" y="4" width="442" height="442" stroke="black" rx="15" strokeWidth="16"/>
                    </svg>
    
                    <h1 id='text'>
                        <a href="./Work.html">
                        <span>WHO </span> 
                        <span>AM </span> 
                        <span>I?</span>
                        </a>
                    </h1> */}
    
                    <div className={styles.story} id='story'>
                        <p className={styles.title}>About Me</p>
                        <p className={styles.paragraph}>HELLO, 
                        I AM A <span>creative developer</span>. I DEVELOP PROJECTS THAT COMBINE <span>technology</span> AND <span>visual design</span>. BY EXPLORING CREATIVE ASPECTS OF THE INDUSTRY, I AM DRIVEN TO EXPERIMENT WITH <span>3d modelling</span>, <span>coding</span> AND <span>UI design</span>.</p>
                        {/* <p id='p'>I AM ME</p>
                        <p id='p'>TAKE AM LIKE THAT</p>
                        <p id='p'>NO STRESS ME</p>
                        <p id='p'>SHA BRING JOB</p>
                        <p id='p'>E MU SE WA</p> */}
                    </div>
                </div>
        </section>
    );
}

export default About;