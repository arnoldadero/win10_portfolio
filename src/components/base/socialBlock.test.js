import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocialBlock from './socialBlock';
import user from '../../utils/data/user.config';

// Mock the LazyImage component since it might involve intersection observer which acts up in tests
jest.mock('./lazyImage', () => (props) => <img alt={props.alt || ''} {...props} />);

// Mock firebase analytics
jest.mock('../../utils/firebaseConfig', () => ({
    analytics: {},
}));
jest.mock('firebase/analytics', () => ({
    logEvent: jest.fn(),
}));

describe('SocialBlock Component', () => {
    test('renders social icons based on user config', () => {
        // Ensure whatsapp is defined in the config we are testing against
        // (This relies on the actual config file being updated, which we did)
        render(<SocialBlock />);

        // Check for WhatsApp
        const whatsappLink = screen.getByLabelText('WhatsApp');
        expect(whatsappLink).toBeInTheDocument();
        expect(whatsappLink).toHaveAttribute('href', `https://wa.me/${user.whatsapp}`);

        // Check for LinkedIn
        const linkedinLink = screen.getByLabelText('LinkedIn');
        expect(linkedinLink).toBeInTheDocument();

        // Check for Twitter (should feature fail if it was removed correctly from component)
        const twitterLink = screen.queryByLabelText('Twitter');
        expect(twitterLink).not.toBeInTheDocument();
    });

    test('generates correct WhatsApp URL', () => {
        render(<SocialBlock />);
        const whatsappLink = screen.getByLabelText('WhatsApp');
        expect(whatsappLink.href).toContain('wa.me');
        expect(whatsappLink.href).toContain('254733943486');
    });

    test('renders icons with bounce logic implied by role', () => {
        render(<SocialBlock />);
        // Checking for links which wrap the icons
        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThan(0);

        links.forEach(link => {
            const img = screen.getByAltText(link.getAttribute('aria-label'));
            expect(img).toBeInTheDocument();
            expect(img).toHaveClass('uk-img');
        });
    });
});
