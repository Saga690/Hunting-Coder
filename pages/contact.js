import React, { useState } from 'react'
import styles from '@/styles/Contact.module.css'


const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [desc, setDesc] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    const data = {phone, name, email, desc};
    fetch('http://localhost:3000/api/postcontact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(data => {
      alert("Thanks for contacting us");
      setName('');
      setPhone('');
      setEmail('');
      setDesc('');
    })
    .catch((error) => {
      console.error('Error: ', error)
    });
  }
  
  const handleChange = (e)=>{
    if (e.target.name == 'phone'){
      setPhone(e.target.value)
    }
    else if (e.target.name == 'name'){
      setName(e.target.value)
    }
    else if (e.target.name == 'email'){
      setEmail(e.target.value)
    }
    else if (e.target.name == 'desc'){
      setDesc(e.target.value)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.mainhead}>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formlabel}>Enter your Name</label>
          <input type="text" value={name} onChange={handleChange} className="form-control" id="name" name="name" aria-describedby="emailHelp" required/>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formlabel}>Enter your E-Mail</label>
          <input type="email" value={email} onChange={handleChange} className="form-control" name="email" id="email" required/>
          <div id="emailHelp" className={styles.formtext}>We will never share your email with anyone else.</div>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formlabel}>Enter your Phone Number</label>
          <input type="phone" value={phone} onChange={handleChange} className="form-control" id="phone" name="phone" aria-describedby="emailHelp" required/>
        </div>
        <div className={styles.mb3}>
        <label htmlFor="desc" className={styles.formlabel}>Elaborate your concern</label>
          <textarea className="form-control" value={desc} onChange={handleChange} name="desc" id="desc" required></textarea>
        </div>
        <button type="submit" className={styles.btn}>Submit</button>
      </form>
    </div>
  )
}

export default Contact