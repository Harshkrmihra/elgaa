import React, { useState } from 'react';

function CoachApplicationForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    dateOfBirth: '',
    discord: '',
    game: '',
    rank: '',
    aboutYou: '',
    role: '',
    achievements: '',
    email: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log(form);
  };

  return (
    <div className="auth">
      <h1 className="text-6xl font-koverwatch">Coach Application</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full focus:bg-darkgray-350 font-oskari py-4 px-8 bg-darkgray-400 outline-none rounded-md"
        />
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full focus:bg-darkgray-350 font-oskari py-4 px-8 bg-darkgray-400 outline-none rounded-md mt-4"
        />
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full focus:bg-darkgray-350 font-oskari py-4 px-8 bg-darkgray-400 outline-none rounded-md mt-4"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full focus:bg-darkgray-350 font-oskari py-4 px-8 bg-darkgray-400 outline-none rounded-md mt-4"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          className="w-full focus:bg-darkgray-350 font-oskari py-4 px-8 bg-darkgray-400 outline-none rounded-md mt-4"
        />
        <input
          type="text"
          name="discord"
          value={form.discord}
          onChange={handleChange}
          placeholder="Discord"
          className="w-full focus:bg-darkgray-350 font-oskari py-4 px-8 bg-darkgray-400 outline-none rounded-md mt-4"
        />
        <input
          type="text"
          name="game"
          value={form.game}
          onChange={handleChange}
          placeholder="Game"
          className="w-full focus:bg-darkgray-350 font-oskari py-4 px-8 bg-darkgray-400 outline-none rounded-md mt-4"
        />
        <input
          type="text"
          name="rank"
          value={form.rank}
          onChange={handleChange}
          placeholder="Rank"
          className="w-full focus:bg-darkgray-350 font-oskari py-4 px-8 bg-darkgray-400 outline-none rounded-md mt-4"
        />
        <textarea
          name="aboutYou"
          value={form.aboutYou}
          onChange={handleChange}
          placeholder="About You"           className="w-full focus:bg-darkgray-350 font-oskari py-4 px-8 bg-darkgray-400 outline-none rounded-md mt-4"
          />
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full focus:bg-darkgray-350 font-oskari py-4 px-8 bg-darkgray-400 outline-none rounded-md mt-4"
          />
          <textarea
            name="achievements"
            value={form.achievements}
            onChange={handleChange}
            placeholder="Your biggest achievements"
            className="w-full focus:bg-darkgray-350 font-oskari py-4 px-8 bg-darkgray-400 outline-none rounded-md mt-4"
          />
          <button
            type="submit"
            className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-oskari mt-8 rounded-lg font-bold"
          >
            Apply
          </button>
        </form>
      </div>
    );
  }
  
  export default CoachApplicationForm;
  