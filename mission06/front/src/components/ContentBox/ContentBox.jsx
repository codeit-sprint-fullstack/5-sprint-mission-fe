import { Navigation } from '../layouts/Navigation';
import { Footer } from '../layouts/Footer';
import '../../styles/ContentBox.css';
export function ContentBox({ children, userEnv, pageFocus }) {
  return (
    <div>
      <Navigation userEnv={userEnv} pageFocus={pageFocus}/>
      <div className='contentArea'>
      {children}
      </div>
      <Footer userEnv={userEnv} />
    </div>
  );
}
