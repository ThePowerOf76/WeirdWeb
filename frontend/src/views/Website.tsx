import { Website } from "../classes//Website";
import "./Website.css"
export interface WebsiteListProps {
    websites: Website[]
}

function DisplayWebsiteList({websites}: WebsiteListProps) {
    if (!websites || websites.length === 0) {
        return <p>No websites to display.</p>;
    }
    return<div className="website-list-container">
      <h2>Website List</h2>
      <ul>
        {websites.map((website: Website, index: number) => (
          <li key={website.url || index}>
            <a href={website.url} target="_blank" rel="noopener noreferrer">
              <div className="website-short">
                <h3>{website.title}</h3>
                <h5>{website.url}</h5>
                <p>Last updated: {new Date(website.updated).toLocaleString()}</p>
                <p>Rating: {website.average_rating} / 5</p>
             </div>
            </a>
          </li>  
        ))}
      </ul>
    </div>
}
export default DisplayWebsiteList;