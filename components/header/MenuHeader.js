/* Code generated with AutoHTML Plugin for Figma */
//import "./DataGridToolbar.css";
import { useState } from "react";
import { AuthContextProvider } from "../../context";
import { ButtonBorder } from "../buttons/ButtonBorder";
import { UserLoginIcon, SocioIcon, PublicarIcon } from "../icons";
import { UserConected } from "../userConected";
import Search from "../Search";
import router from 'next/router'
import Link from "next/link";



export const DataGridToolbar = ({ setMenu, menu }) => {
  const { user } = AuthContextProvider()

  const onRout = () => {
    router.push("/suscripcion/hazte-Socio")
  }

  const onClick = () => {
    setMenu(!menu)
  }

  const loginClick = () => {
    if (!user) {
      router.push(`/login/?d=${router.asPath}`)
    } else {
      onClick()
    }
  }

  return (
    <div className="hidden md:block  shrink-0* w-[1000px] ">

      <div className="flex justify-between  itemes-center  " >

        <div className="  " >
          <span className="md:text-xs lg:text-sm  text-redTextoEncabezado font-display mr-1" >Ultima hora</span>
          <span className="md:text-xs lg:text-sm  font-display md:truncate">El gobierno aprueba una ley Especial</span>
        </div>


        <Search />

        <div className="flex gap-2"  >
          <Link href={"https://cms.diariocivitas.com"}>
            <a target="_blank">
              <ButtonBorder
                icon={<PublicarIcon />}
                text={"Publica tu articulo"}
                onClick={null}
              />
            </a>
          </Link>

          <div onClick={() => onRout()}>
            <ButtonBorder
              icon={<SocioIcon />}
              text={"Hazte Socio/a"}
              onClick={null}
            />
          </div>

          <div onClick={() => loginClick()}>
            <UserConected />
          </div>
        </div>

      </div>
    </div>
  );
};
