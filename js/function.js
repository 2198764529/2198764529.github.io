function updateDateTimeByElementClass(elementClass) {
  // 定义更新函数
  function updateTimestamp(element) {
    if (!element) {
      console.log("元素不存在");
      return;
    }

    const targetTimestamp = parseInt(element.dataset.unix); // 从元素中获取时间字符串,转时间戳
    const currentTimestamp = Math.floor(Date.now() / 1000); // 当前时间戳，单位为秒
    const timestampDifference = currentTimestamp - targetTimestamp;
    if (elementClass == "nowDate") {
      // 现在, month月day日 period
      const date = new Date(currentTimestamp * 1000); // 将时间戳转换为毫秒
      const month = date.getMonth() + 1; // 月份从0开始
      const day = date.getDate();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const period = getTimePeriod(hour);
      let workStatus = checkWorkStatus(date)
      const currentDayOfWeek = date.getDay() + 1;


      const lastDayOfMonth = new Date(date.getFullYear(), month + 1, 0);

      // 计算还有多少天剩余在本月
      const daysUntilEndOfMonth = lastDayOfMonth.getDate() - date.getDate();
      // 根据某一天来判断提示语
      const tips_dayofweek = [
        "周一到了, 周末休息好了吗?",
        "周二到了, 思考一下工作怎么做吧",
        "周三到了, 日子一下子就过去了",
        "周四到了, 疯狂星期四!!",
        "周五到了,明天就周末了,想好今天做什么了吗",
        "周六到了,日子过得怎么样",
        "周日到了,出去晒晒太阳吧",
      ];
      if (currentDayOfWeek<2)
        workStatus = ""
      let textContent = `${period}好!  现在 ${hour}时${minutes}分 ${workStatus} 本周剩 ${currentDayOfWeek} 天,本月剩 ${daysUntilEndOfMonth} 天`;

      element.textContent = textContent;
    } else if (timestampDifference < 60) {
      // 不到1分钟，timestampDifference 秒前
      element.textContent = `${timestampDifference} 秒前`;
    } else if (timestampDifference < 3600) {
      // 不到1小时， minutes 小时前
      const minutes = Math.floor(timestampDifference / 60);
      element.textContent = `${minutes} 分钟前`;
    } else if (timestampDifference < 86400) {
      // 不到24小时，显示 hours 小时前
      const hours = Math.floor(timestampDifference / 3600);
      element.textContent = `${hours} 小时前`;
    } else if (timestampDifference < 31536000) {
      // 不到1年，显示month-day period
      const date = new Date(targetTimestamp * 1000); // 将时间戳转换为毫秒
      const month = date.getMonth() + 1; // 月份从0开始
      const day = date.getDate();
      const hour = date.getHours();
      const period = getTimePeriod(hour);
      element.textContent = `${month}-${day} ${period}`;
    } else {
      // 大于1年，显示year-month-day period
      const date = new Date(targetTimestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const period = getTimePeriod(hour);

      element.textContent = `${year}-${month}-${day} ${period}`;
    }
  }

  function getTimePeriod(hour) {
    if (hour >= 0 && hour < 5) {
      return "凌晨";
    } else if (hour >= 5 && hour < 9) {
      return "早晨";
    } else if (hour >= 9 && hour < 12) {
      return "上午";
    } else if (hour === 12) {
      return "中午";
    } else if (hour > 12 && hour < 18) {
      return "下午";
    } else if (hour >= 18 && hour < 22) {
      return "晚上";
    } else {
      return "深夜";
    }
  }

  function checkWorkStatus(currentTime) {
    // 定义上班时间和下班时间
    const workStartTime = new Date(currentTime);
    workStartTime.setHours(9, 0, 0); // 假设上班时间是早上9点

    const workEndTime = new Date(currentTime);
    workEndTime.setHours(18, 0, 0); // 假设下班时间是下午5点

    // 比较当前时间与上班时间和下班时间
    if (currentTime >= workStartTime && currentTime <= workEndTime) {
      const timeRemaining = workEndTime - currentTime;
      const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
      const minutesRemaining = Math.floor((timeRemaining / (1000 * 60)) % 60);

      if (hoursRemaining === 0) {
        return `离下班还有 ${minutesRemaining} 分钟`;
      } else {
        return `离下班还有 ${hoursRemaining} 小时 ${minutesRemaining} 分钟`;
      }
    } else if (currentTime < workStartTime) {
      const timeRemaining = workStartTime - currentTime;
      const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
      const minutesRemaining = Math.floor((timeRemaining / (1000 * 60)) % 60);

      if (hoursRemaining === 0) {
        return `离上班还有 ${minutesRemaining} 分钟`;
      } else {
        return `离上班还有 ${hoursRemaining} 小时 ${minutesRemaining} 分钟`;
      }
    } else {
      const timePassed = currentTime - workEndTime;
      const hoursPassed = Math.floor(timePassed / (1000 * 60 * 60));
      const minutesPassed = Math.floor((timePassed / (1000 * 60)) % 60);

      if (hoursPassed === 0) {
        return `已经下班 ${minutesPassed} 分钟`;
      } else {
        return `已经下班 ${hoursPassed} 小时 ${minutesPassed} 分钟`;
      }
    }
  }

  function main() {
    const elements = Array.from(document.getElementsByClassName(elementClass));
    elements.forEach(updateTimestamp);
  }

  // 初始页面加载时调用一次
  main();
}
