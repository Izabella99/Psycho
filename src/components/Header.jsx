import * as React from 'react';
import "../assets/css/Header.css";
import '@fontsource/roboto/300.css';

const Header = () => {

  return (
	  <div className='header'>
        <div class="row" id="psihologie_header">
			<div class="small-4 medium-4 large-4 columns" id="stanga_sus">
				<a href="https://www.ubbcluj.ro" target="_parent">
					<img src="https://psiedu.ubbcluj.ro/theme/psiho-2015/img/ubb_logo.png" alt="Universitatea Babes-Bolyai - invatamant superior" />
				</a>
			</div> 
			<div class="small-5 medium-5 large-5 columns" id="dreapta_sus">
				<a href="https://psiedu.ubbcluj.ro/" target="_parent">
					<img src="https://psiedu.ubbcluj.ro/theme/psiho-2015/img/psiho_logo.png" alt="Facultatea de Psihologie si Stiinte ale Educatiei" />
				</a>
			</div> 
		</div> 
	</div>
);
};
export default Header;