import got from 'got';
import moment from 'moment';
import _ from 'lodash';

import { palm } from '../../server';

export default {
  name: 'resta',
  keywords: ['rr'],
  run (text) {
    const words = text.split(' ');
    const host = 'http://localhost:1337/tasks';

    if (words[1] === 'list') {
      got.get(host, { json: true })
        .then(res => {
          const tasks = res.body;

          const tasksForToday = [];
          let message = `Tasks for ${moment().format('DD.MM.YYYY')}\n\n\n`;
          let tasksAmount = 0;

          _.forEach(tasks, (task) => {
            const taskDue = task.datetime;
            if (taskDue) {
              const today = moment();
              const date = moment(taskDue);
              if (today.startOf('day').toDate() < date.toDate()
                && date.toDate() < today.endOf('day')) {
                tasksAmount++;
                tasksForToday.push(task);
                message += `${tasksAmount}. ${task.name} (${date.fromNow()}) \n`;
              }
            }
          });


          palm.send({
            to: palm._parent,
            text: message,
          });
        })
        .catch(err => {
          console.error(err);
          palm.send({
            to: palm._parent,
            text: 'Check err',
          });
        });
    }

    if (words[1] === 'created') {
      got.get(host, { json: true })
        .then(res => {
          const tasks = res.body;

          const tasksCreatedLastWeek = [];
          let message = `Stats for last week:\n\n`;
          let tasksAmount = 0;
          let closedTasksAmount = 0

          _.forEach(tasks, (task) => {
            const taskDue = task.createdAt;
            if (taskDue) {
              const startOfWeek = moment().subtract(1, 'week').startOf('week');
              const endOfWeek = moment().subtract(1, 'week').endOf('week');
              const date = moment(taskDue);
              if (startOfWeek.toDate() < date.toDate()
                && date.toDate() < endOfWeek.toDate()) {
                tasksAmount++;
                if (task.isOpen) closedTasksAmount++
                tasksCreatedLastWeek.push(task);
              }
            }
          });
          message += `Tasks opened: ${tasksCreatedLastWeek.length}\n`
          message += `Tasks closed: ${closedTasksAmount}\n`
          message += `Open/closed rate: ${100*closedTasksAmount/tasksCreatedLastWeek.length}%\n`

          palm.send({
            to: palm._parent,
            text: message,
          });
        })
        .catch(err => {
          console.error(err);
          palm.send({
            to: palm._parent,
            text: 'Check err',
          });
        });
    }

    return 'Done.';
  },
};
