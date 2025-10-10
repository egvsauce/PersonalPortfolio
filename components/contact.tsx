"use client";
import React from 'react'
import SectionHeading from "./section-heading";
import { FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import { sendEmail } from '@/actions/sendEmail';
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import { FiMail, FiMessageSquare } from "react-icons/fi";
import { ContactTiles } from './contact-tiles';
export default function Contact() {
  const { ref } = useSectionInView("Contact");
  

  return (
  <motion.section ref={ref} id="contact" className="mb-20 sm:mb-28 mx-auto "
    initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{duration:1}}
    viewport={{once:true}}
  >
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-500">
          Get in touch
        </p>
      <SectionHeading>Contact Me</SectionHeading>
      <div className="flex justify-center">
            <div className="">
              <div className="flex flex-col gap-2">
              <p className="text-center text-xs uppercase text-gray-700">
                Feel free to message me through this form or directly by:
              </p>
              <p className="text-center text-xs text-gray-800 font-thin">
                <a>ethankontakt@gmail.com </a>
                | +1 480-717-7795 
              </p>
              </div>
                <form className='mt-7 flex flex-col dark:text-black' action={ async (formData) => {
                const { data,error } = await sendEmail(formData);
                  if (error) {
                    toast.error(error);
                    return;
                  }
                  toast.success("Message sent successfully!");
                }}
                >
                  <input type="email" 
                  name="senderEmail"
                    required
                  maxLength={500}
                    placeholder="Your Email" className="h-14 my-3 rounded-lg p-4 border border-black/10 w-full" />
                  <textarea name="message" required maxLength={5000} placeholder="Your message" className="h-52 my-3 rounded-lg border border-black/10 p-4 w-full"/>
                  <SubmitBtn />
                </form>
              </div>
        </div>
    </motion.section>
  );
}
