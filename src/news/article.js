import React from "react";

const leftPadNumber = number => {
  return number < 10 ? `0${number}` : number.toString();
};

export const Article = props => {
  let date = new Date(props.publishedAt);
  let month = leftPadNumber(date.getMonth() + 1);
  let day = leftPadNumber(date.getDate());
  let hours = leftPadNumber(date.getHours());
  let minutes = leftPadNumber(date.getMinutes());
  let dateString = `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}`;
  let image = props.urlToImage ? (
    <img src={props.urlToImage} alt={props.title} />
  ) : null;
  return (
    <div>
      <h4>{props.source.name}</h4>
      <h3>{props.title}</h3>
      {image}
      <p>{props.description}</p>
      <p>
        By <span>{props.author}</span>
      </p>
      <p>{dateString}</p>
    </div>
  );
};
