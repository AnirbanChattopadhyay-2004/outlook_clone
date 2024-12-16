"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import Mail from "./Mail";
import { Mailbodytype, Mailtype } from "../types/mailtype";
import Mailbody from "./Mailbody";
import FilterButton from "./FilterButton";
const Page1 = () => {
  const [unreadmails, setUnreadmails] = useState<Mailtype[]>([]);
  const [readmails, setReadmails] = useState<Mailtype[]>([]);
  const [favouritemails, setFavouritemails] = useState<Mailtype[]>([]);
  const [selectedmail, setSelectedmail] = useState<string>("");
  const [selectedtype, setSelectedtype] = useState<string>("Unread");
  const [mailbody, setMailbody] = useState<Mailbodytype>({
    id: "",
    body: "",
  });
   const [loading,setLoading] = useState<boolean>(false)
  const [mailheader, setMailheader] = useState<Mailtype>({
    id: "",
    from: { email: "", name: "" },
    date: 0,
    subject: "",
    short_description: "",
  });
  async function handlemail(mailid: string, label: string) {
    const a = unreadmails.find((mail) => mail.id === mailid);
    const b = readmails.find((mail) => mail.id === mailid);
    const c = favouritemails.find((mail) => mail.id === mailid);
    setLoading(true)
    const bodyofmail = await fetch(
      `https://flipkart-email-mock.now.sh/?id=${mailid}`
    );
    const resp = await bodyofmail.json();
    setMailbody(resp);
    setLoading(false)
    // console.log("res1111"+JSON.stringify(resp))
    if (label === "Unread") {
      if (!a) return;
      setMailheader(a);
      setUnreadmails((prev) => {
        return prev?.filter((ele) => {
          return ele.id != mailid;
        });
      });

      setReadmails((prev) => {
        return [...prev, a];
      });
    }
    if (label === "Read") {
      if (!b) return;
      setMailheader(b);
      setSelectedmail(mailid);
    }
    if (label === "Favorites") {
      if (!c) return;
      setMailheader(c);
      setSelectedmail(mailid);
    }
  }
  function onclick(type: string) {
    if (!type) return;
    setSelectedtype(type);
  }
  function handlefavourite(mailid: string) {
    const a = readmails.find((ele) => {
      return ele.id === mailid;
    });
    if (!a) return;
    setFavouritemails((prev) => {
      return [...prev, a];
    });
  }
  useEffect(() => {
    async function getMails() {
      const a = localStorage.getItem("unreadmailspage2");
      const b = localStorage.getItem("readmailspage2");
      const c = localStorage.getItem("favoritemailspage2");
      if (a) {
        setUnreadmails(JSON.parse(a));
        if (b) setReadmails(JSON.parse(b));
        if (c) setFavouritemails(JSON.parse(c));
      } else {
        const response = await fetch(
          "https://flipkart-email-mock.now.sh/?page=2 "
        );
        const res = await response.json();
        setUnreadmails(res.list);
      }
    }
    getMails();
  }, []);
  useEffect(() => {
    setSelectedmail("");
  }, [selectedtype]);
  useEffect(() => {
    if (readmails.length > 0)
      localStorage.setItem("readmailspage2", JSON.stringify(readmails));
    if (unreadmails.length > 0)
      localStorage.setItem("unreadmailspage2", JSON.stringify(unreadmails));
    if (favouritemails.length > 0)
      localStorage.setItem(
        "favoritemailspage2x",
        JSON.stringify(favouritemails)
      );
  }, [readmails, unreadmails, favouritemails]);
  if (!unreadmails) return <div className="h-screen flex justify-center items-center">Loding...</div>;
  return (
    <main className="px-5">
      <div className="flex gap-3 h-[9vh]">
      <p className="p-1 text-black">Filter By:&nbsp;&nbsp;</p>
      
        <FilterButton
          label={"Unread"}
          selected={selectedtype === "Unread"}
          onclick={onclick}
        />
        <FilterButton
          label={"Read"}
          selected={selectedtype === "Read"}
          onclick={onclick}
        />
        <FilterButton
          label={"Favorites"}
          selected={selectedtype === "Favorites"}
          onclick={onclick}
        />
      </div>
      <section className={`flex  gap-2 h-[100%] `}>
        <div className="flex flex-col gap-5  flex-1 ">
          {selectedtype === "Unread" &&
            unreadmails.map((mailobj, index: number) => {
              return (
                <Mail
                  key={index}
                  label="Unread"
                  isFavorite={false}
                  isActive={selectedmail === mailobj.id}
                  mailobj={mailobj}
                  handlemail={handlemail}
                />
              );
            })}
          {selectedtype === "Read" &&
            readmails.map((mailobj, index: number) => {
            //   console.log("c+++++" + favouritemails.includes(mailobj));
              return (
                <Mail
                  key={index}
                  label="Read"
                  isFavorite={favouritemails.some((obj) => {
                    return JSON.stringify(obj) === JSON.stringify(mailobj);
                  })}
                  isActive={selectedmail === mailobj.id}
                  mailobj={mailobj}
                  handlemail={handlemail}
                />
              );
            })}
          {selectedtype === "Favorites" &&
            favouritemails.map((mailobj, index: number) => {
              return (
                <Mail
                  key={index}
                  label="Favorites"
                  isFavorite={true}
                  isActive={selectedmail === mailobj.id}
                  mailobj={mailobj}
                  handlemail={handlemail}
                />
              );
            })}
        </div>

        {selectedmail && (
          <section className="w-[55vw] h-[85vh]   flex justify-start sticky top-[12vh] border rounded-md border-[#CFD2DC]">
            <Mailbody
              mailbody={mailbody}
              mailheader={mailheader}
              handlefavourite={handlefavourite}
              isLoading={loading}
              isFavorite={favouritemails.some((obj) => {
                return JSON.stringify(obj) === JSON.stringify(mailheader);
              })}
            />
          </section>
        )}
      </section>
    </main>
  );
};

export default Page1;
