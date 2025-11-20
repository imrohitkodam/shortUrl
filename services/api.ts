
import { Link, CreateLinkDto } from '../types';

// In-memory "database" seeded with some data
let links: Link[] = [
  {
    id: 1,
    code: 'g-react',
    target_url: 'https://react.dev',
    clicks: 12,
    last_clicked: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    code: 'g-tw',
    target_url: 'https://tailwindcss.com',
    clicks: 5,
    last_clicked: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
let nextId = 3;

const SIMULATED_LATENCY = 500;

const generateRandomCode = (length = 7): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const api = {
  getLinks: (): Promise<Link[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...links].sort((a,b) => b.id - a.id)), SIMULATED_LATENCY);
    });
  },

  getLinkByCode: (code: string): Promise<Link> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const link = links.find((l) => l.code === code);
        if (link) {
          resolve(link);
        } else {
          reject({ status: 404, message: 'Link not found' });
        }
      }, SIMULATED_LATENCY);
    });
  },

  createLink: (data: CreateLinkDto): Promise<Link> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validation
        if (!/^(https?:\/\/)/.test(data.target_url)) {
          return reject({ status: 400, message: 'Invalid URL format. Must start with http:// or https://' });
        }
        
        let code = data.code;
        if (code) {
          if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
            return reject({ status: 400, message: 'Custom code must be 6-8 alphanumeric characters.' });
          }
          if (links.some((l) => l.code === code)) {
            return reject({ status: 409, message: 'This custom code is already in use.' });
          }
        } else {
          do {
            code = generateRandomCode();
          } while (links.some((l) => l.code === code));
        }

        const newLink: Link = {
          id: nextId++,
          code,
          target_url: data.target_url,
          clicks: 0,
          last_clicked: null,
          created_at: new Date().toISOString(),
        };
        links.push(newLink);
        resolve(newLink);
      }, SIMULATED_LATENCY);
    });
  },

  deleteLink: (code: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = links.findIndex((l) => l.code === code);
        if (index !== -1) {
          links.splice(index, 1);
          resolve();
        } else {
          reject({ status: 404, message: 'Link not found for deletion.' });
        }
      }, SIMULATED_LATENCY);
    });
  },

  recordClick: (code: string): Promise<Link> => {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        const link = links.find((l) => l.code === code);
        if (link) {
          link.clicks++;
          link.last_clicked = new Date().toISOString();
          resolve(link);
        } else {
          reject({ status: 404, message: 'Link not found' });
        }
      }, 100); // Shorter latency for redirects
    });
  },
};
