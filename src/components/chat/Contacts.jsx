import React from 'react';
import "../../assets/css/Contacts.css";
import { BsPersonCircle } from "react-icons/bs";

function Contacts() {

  const contacts = [
      {
          id: 1,
          name: 'Maria Popescu'
      },
      {
          id: 2,
          name: 'Maria Popescu'
      },
      {
        id: 3,
        name: 'Maria Popescu'
      },
      {
        id: 4,
        name: 'Maria Popescu'
      },
      {
        id: 5,
        name: 'Maria Popescu'
      },
      {
        id: 6,
        name: 'Maria Popescu'
      },
      {
        id: 7,
        name: 'Maria Popescu'
      },
      {
        id: 8,
        name: 'Maria Popescu'
      },
      {
        id: 9,
        name: 'Maria Popescu'
      }
  ]

  return (
    <div className='contacts-container'>
        <div className='contacts'>
            {
                contacts.map((contact, index) => {
                    return (
                        <div className='contact' key={index}>
                            <div className="avatar">
                                <BsPersonCircle />
                            </div>
                            <div className="username">
                                <p>{contact.name}</p>
                            </div>
                        </div>
                        );
                    })
            }
        </div>
    </div>
  );
};

export default Contacts;