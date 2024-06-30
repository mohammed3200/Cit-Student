import { Events } from "../interfaces"
import moment from "moment";

export const configDataEvents = (data: Events) => {
  // current date/time
  const date_now = moment();

  // publication date
  const date_pub = moment(data.Publication_date);

  // prepare the string
  let when_str = "";

  // difference in minutes
  const diff_minutes = date_now.diff(date_pub, "minutes");
  if (diff_minutes < 1) {
    when_str = "منذ لحظات";
  } else if (diff_minutes >= 1 && diff_minutes < 2) {
    when_str = "منذ دقيقة";
  } else if (diff_minutes >= 2 && diff_minutes < 3) {
    when_str = `منذ دقيقتين`;
  } else if (diff_minutes < 60) {
    when_str = `دقائق ${diff_minutes} منذ`;
  } else {
    // difference in hours
    const diff_hours = date_now.diff(date_pub, "hours");
    if (diff_hours >= 1 && diff_hours < 2) {
      when_str = "منذ ساعة";
    } else if (diff_hours >= 2 && diff_hours < 3) {
      when_str = "منذ ساعتين";
    } else if (diff_hours < 24) {
      when_str = ` منذ ${diff_hours} ساعة`;
    } else {
      // difference in days
      const diff_days = date_now.diff(date_pub, "days");
      if (diff_days >= 1 && diff_days < 2) {
        when_str = "أمس";
      }
      if (diff_days >= 2 && diff_days < 3) {
        when_str = "منذ يومان";
      } else if (diff_days < 30) {
        when_str = `منذ ${diff_days} يوم`;
      } else {
        // difference in months
        const diff_months = date_now.diff(date_pub, "months");
        if (diff_months >= 1 && diff_months < 2) {
          when_str = "منذ شهر";
        } else if (diff_months >= 2 && diff_months < 3) {
          when_str = "منذ شهرين";
        } else {
          when_str = `منذ ${diff_months} شهر`;
        }
      }
    }
  }

  return {
    Title: data.Title,
    Description: data.Description,
    // When the publication was published
    When: when_str,
    photo: data.Image,
    date_pub
  };
};