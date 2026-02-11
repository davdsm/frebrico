import React from 'react';
import { Logo } from '../atoms/Logo';

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-black/10 py-12 md:py-16">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Logo />
            <p className="text-sm text-black/60 leading-relaxed">
              Soluções completas em vedações e bricolage com qualidade garantida.
            </p>
            <div className="flex gap-4">
              {/* Social Icons */}
              <a href="#" className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.4286 1.71484C19.4911 1.71484 20.3995 2.09208 21.154 2.84654C21.9085 3.601 22.2857 4.50949 22.2857 5.57199V18.4291C22.2857 19.4916 21.9085 20.4001 21.154 21.1546C20.3995 21.909 19.4911 22.2863 18.4286 22.2863H15.9107V14.3175H18.5759L18.9777 11.2104H15.9107V9.22824C15.9107 8.72824 16.0156 8.35324 16.2254 8.10324C16.4353 7.85324 16.8437 7.72824 17.4509 7.72824L19.0848 7.71484V4.94252C18.5223 4.86217 17.7277 4.82199 16.7009 4.82199C15.4866 4.82199 14.5156 5.17913 13.7879 5.89342C13.0603 6.6077 12.6964 7.61663 12.6964 8.9202V11.2104H10.0179V14.3175H12.6964V22.2863H5.57142C4.50892 22.2863 3.60044 21.909 2.84598 21.1546C2.09151 20.4001 1.71428 19.4916 1.71428 18.4291V5.57199C1.71428 4.50949 2.09151 3.601 2.84598 2.84654C3.60044 2.09208 4.50892 1.71484 5.57142 1.71484H18.4286Z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7V7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9V9Z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.7836 19.821H3.34923C1.57538 19.821 0.132308 18.381 0.132308 16.6108V3.21026C0.132308 1.44 1.57538 0 3.34923 0H16.7836C18.5569 0 20 1.44 20 3.21026V16.6113C20 18.3815 18.5569 19.821 16.7836 19.821ZM6.84564 16.3862H6.84974V7.83641H4.18974V16.3862H6.84513H6.84564ZM5.51795 6.66872C5.72019 6.66899 5.9205 6.62935 6.1074 6.55208C6.2943 6.47481 6.46412 6.36142 6.60713 6.21842C6.75014 6.07541 6.86353 5.90559 6.9408 5.71869C7.01807 5.53179 7.05771 5.33148 7.05744 5.12923C7.05662 4.72118 6.89417 4.33008 6.60563 4.04155C6.3171 3.75301 5.926 3.59056 5.51795 3.58974C5.10969 3.58988 4.7182 3.75212 4.42952 4.0408C4.14084 4.32948 3.9786 4.72098 3.97846 5.12923C3.9786 5.53749 4.14084 5.92898 4.42952 6.21766C4.7182 6.50634 5.10969 6.66858 5.51795 6.66872ZM16.799 16.3867V11.6995C16.799 9.39641 16.299 7.62462 13.6118 7.62462C12.32 7.62462 11.4528 8.33231 11.0964 9.0041H11.0605V7.83641H8.51333V16.3862H11.1687V12.1554C11.1687 11.0395 11.3805 9.96 12.7636 9.96C14.1236 9.96 14.1436 11.2359 14.1436 12.2272V16.3862H16.799V16.3867Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4">Loja</h4>
            <ul className="space-y-2 text-sm text-black/60">
              <li><a href="#" className="hover:text-black transition-colors">Produtos</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Materiais</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Vedações</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Bricolage</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-black/60">
              <li><a href="#" className="hover:text-black transition-colors">Sobre</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contactos</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Projetos</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Clientes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-black/60">
              <li><a href="#" className="hover:text-black transition-colors">Termos</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Licenças</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-black/60">
          <p>© 2026 Frebrico. Todos os direitos reservados.</p>
          <p>Feito em Portugal</p>
        </div>
      </div>
    </footer>
  );
}