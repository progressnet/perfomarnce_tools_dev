export const summaryData = [
  {
    country: 'Greece',
    code: 'GR',
    tasks: [
      {
        process: 'processName',
        subprocess: 'subProcessName',
        taskName: 'taskName',
        agents: [
          {
            firstName: "Vossios Dimitris",
            dates: {
              "2024-01-01": 2,
              "2024-01-02": 3,
              "2024-01-03": 4,
              "2024-01-04": 5,
            }
          },
          {
            firstName: "Another Agent",
            dates: {
              "2024-01-01": 2,
              "2024-01-02": 2,
              "2024-01-03": 3,
              "2024-01-04": 1,
            }
          }
        ],
        totalHours: {
          "2024-01-01": 4,
          "2024-01-02": 5,
          "2024-01-03": 7,
          "2024-01-06": 6,
          "2024-01-20": 6,
          "2024-01-22": 6,
        }
      },
      {
        process: 'processName',
        subprocess: 'subProcessName',
        taskName: 'taskName 2',
        agents: [
          {
            firstName: "Vossios Dimitris",
            dates: {
              "2024-01-01": 1,
              "2024-01-02": 3,
              "2024-01-03": 3,
              "2024-01-04": 2,
            }
          }
        ],
        totalHours: {
          "2024-01-01": 1,
          "2024-01-02": 3,
          "2024-01-03": 3,
          "2024-01-04": 2,
        }
      }
    ]
  },
  {
    country: 'Belgium',
    code: 'BE',
    tasks: [
      {
        process: 'anotherProcess',
        subprocess: 'anotherSubProcess',
        taskName: 'taskName',
        agents: [
          {
            firstName: "Agent One",
            dates: {
              "2024-01-01": 2,
              "2024-01-02": 3,
              "2024-01-03": 2,
              "2024-01-04": 1,
            }
          }
        ],
        totalHours: {
          "2024-01-01": 2,
          "2024-01-02": 3,
          "2024-01-03": 2,
          "2024-01-04": 1,
        }
      }
    ]
  }
];
