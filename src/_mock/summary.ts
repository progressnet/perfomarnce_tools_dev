import type {ISummaryData} from "../sections/my-reports/table/_types";

export const tableData: ISummaryData = [
  {
    id: 1,
    country: "Greece",
    code: "gr",
    totalHours: 30, // Total hours for all nested entities within Greece
    dateHours: {  // Total hours across all entities and agents by date
      "2024-01-01": 3, // key: string - value: number
      "2024-01-02": 4,
      "2024-01-03": 6,
      "2024-01-04": 7,
      "2024-01-06": 4,
      "2024-01-20": 6,
    },
    entities: [
      {
        entityName: "MNL4",
        totalHours: 30, // Sum of hours for all master processes under this entity
        dateHours: { // Sum of hours for all tasks within this entity, by date
          "2024-01-01": 3,
          "2024-01-02": 4,
          "2024-01-03": 6,
          "2024-01-04": 7,
          "2024-01-06": 4,
          "2024-01-20": 6,
        },
        masterProcesses: [
          {
            processId: 'process824ks', // a unique id,
            processName: "Process 1",
            totalHours: 20, // Sum of hours for all subprocesses under this process
            dateHours: {
              "2024-01-01": 3,
              "2024-01-02": 4,
              "2024-01-03": 6,
              "2024-01-04": 7,
            },
            subProcesses: [
              {
                subProcessId: 'subprocess3ll39djh',
                subProcessName: "Subprocess 1.1",
                totalHours: 12, // Sum of hours for all tasks under this subprocess
                dateHours: {
                  "2024-01-01": 2,
                  "2024-01-02": 3,
                  "2024-01-03": 4,
                  "2024-01-04": 3,
                },
                tasks: [
                  {
                    taskId: 'taskA3350lssjj',
                    taskName: "Task A - large task name A for testing",
                    totalHours: 6,
                    dateHours: {
                      "2024-01-01": 2,
                      "2024-01-02": 2,
                      "2024-01-03": 1,
                      "2024-01-04": 1,
                    },
                    agents: [
                      {
                        agentId: 'agent334kkss',
                        lastName: "Vossios",
                        totalHours: 3,
                        dateHours: {
                          "2024-01-01": 1,
                          "2024-01-02": 1,
                          "2024-01-03": 1,
                        },
                      },
                      {
                        agentId: 'agent235ksoo',
                        lastName: "Papadopoulos",
                        totalHours: 3,
                        dateHours: {
                          "2024-01-01": 1,
                          "2024-01-02": 1,
                          "2024-01-04": 1,
                        },
                      },
                    ],
                  },
                  {
                    taskId: 'taskB3345skcjhe',
                    taskName: "Task B",
                    totalHours: 6,
                    dateHours: {
                      "2024-01-02": 1,
                      "2024-01-03": 3,
                      "2024-01-04": 2,
                    },
                    agents: [
                      {
                        agentId: 'sefij224jkjdvxklm',
                        lastName: "Kostas",
                        totalHours: 6,
                        dateHours: {
                          "2024-01-02": 1,
                          "2024-01-03": 3,
                          "2024-01-04": 2,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                subProcessId: 'subprocess3ll3sdfseh',
                subProcessName: "Subprocess 1.2",
                totalHours: 8,
                dateHours: {
                  "2024-01-01": 1,
                  "2024-01-02": 1,
                  "2024-01-03": 2,
                  "2024-01-04": 4,
                },
                tasks: [
                  {
                    taskId: 'taskCsgej33',
                    taskName: "Task C",
                    totalHours: 8,
                    dateHours: {
                      "2024-01-01": 1,
                      "2024-01-02": 1,
                      "2024-01-03": 2,
                      "2024-01-04": 4,
                    },
                    agents: [
                      {
                        agentId: 'maria24jkns',
                        lastName: "Maria",
                        totalHours: 8,
                       dateHours: {
                          "2024-01-01": 1,
                          "2024-01-02": 1,
                          "2024-01-03": 2,
                          "2024-01-04": 4,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            processId: 'process8345d',
            processName: "Process 2",
            totalHours: 10,
            dateHours: {
              "2024-01-06": 4,
              "2024-01-20": 6,
            },
            subProcesses: [
              {
                subProcessId: 'subprocess3333k3sdfseh',
                subProcessName: "Subprocess 2.1",
                totalHours: 10,
                dateHours: {
                  "2024-01-06": 4,
                  "2024-01-20": 6,
                },
                tasks: [
                  {
                    taskId: 'taskDse254kk',
                    taskName: "Task D",
                    totalHours: 10,
                    dateHours: {
                      "2024-01-06": 4,
                      "2024-01-20": 6,
                    },
                    agents: [
                      {
                        agentId: 'se45jjm',
                        lastName: "George",
                        totalHours: 10,
                        dateHours: {
                          "2024-01-06": 4,
                          "2024-01-20": 6,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    country: "Belgium",
    code: "be",
    totalHours: 60, // Total hours for all nested entities within Belgium
    dateHours: {  // Total hours across all entities and agents by date
      "2024-01-01": 6,
      "2024-01-02": 8,
      "2024-01-03": 9,
      "2024-01-04": 10,
      "2024-01-06": 7,
      "2024-01-10": 5,
      "2024-01-12": 4,
      "2024-01-14": 5,
      "2024-01-18": 3,
      "2024-01-22": 4,
    },
    entities: [
      {
        entityName: "BRU1",
        totalHours: 40, // Sum of hours for all master processes under this entity
        dateHours: { // Sum of hours for all tasks within this entity, by date
          "2024-01-01": 5,
          "2024-01-02": 7,
          "2024-01-03": 8,
          "2024-01-04": 6,
          "2024-01-06": 5,
          "2024-01-10": 4,
        },
        masterProcesses: [
          {
            processId: 'process8sdfsfes33455',
            processName: "Process 1",
            totalHours: 25, // Sum of hours for all subprocesses under this process
            dateHours: {
              "2024-01-01": 4,
              "2024-01-02": 5,
              "2024-01-03": 7,
              "2024-01-04": 4,
            },
            subProcesses: [
              {
                subProcessId: 'subprocess3ll3sdfseh',
                subProcessName: "Subprocess 1.1",
                totalHours: 15, // Sum of hours for all tasks under this subprocess
                dateHours: {
                  "2024-01-01": 2,
                  "2024-01-02": 3,
                  "2024-01-03": 5,
                  "2024-01-04": 5,
                },
                tasks: [
                  {
                    taskId: 'taskA3350lssjjsef32',
                    taskName: "Task A",
                    totalHours: 8,
                    dateHours: {
                      "2024-01-01": 1,
                      "2024-01-02": 2,
                      "2024-01-03": 3,
                      "2024-01-04": 2,
                    },
                    agents: [
                      {
                        agentId: '34sggmx',
                        lastName: "Jansen",
                        totalHours: 4,
                        dateHours: {
                          "2024-01-01": 1,
                          "2024-01-02": 1,
                          "2024-01-03": 1,
                        },
                      },
                      {
                        agentId: 'se4j3j4',
                        lastName: "De Vos",
                        totalHours: 4,
                        dateHours: {
                          "2024-01-01": 1,
                          "2024-01-02": 1,
                          "2024-01-04": 2,
                        },
                      },
                    ],
                  },
                  {
                    taskId: 'se43oij5jk35kl3m',
                    taskName: "Task B",
                    totalHours: 7,
                    dateHours: {
                      "2024-01-02": 1,
                      "2024-01-03": 4,
                      "2024-01-04": 2,
                    },
                    agents: [
                      {
                        agentId: 'se34j;3j5j',
                        lastName: "Hendrik",
                        totalHours: 7,
                        dateHours: {
                          "2024-01-02": 1,
                          "2024-01-03": 4,
                          "2024-01-04": 2,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                subProcessId: 'subprocess334384u5345ukjd',
                subProcessName: "Subprocess 1.2",
                totalHours: 10,
                dateHours: {
                  "2024-01-01": 1,
                  "2024-01-02": 2,
                  "2024-01-03": 2,
                  "2024-01-04": 5,
                },
                tasks: [
                  {
                    taskId: '345k345lksdfer',
                    taskName: "Task C",
                    totalHours: 10,
                    dateHours: {
                      "2024-01-01": 1,
                      "2024-01-02": 2,
                      "2024-01-03": 2,
                      "2024-01-04": 5,
                    },
                    agents: [
                      {
                        agentId: '34kmldmvlkmwe',
                        lastName: "Sophie",
                        totalHours: 10,
                        dateHours: {
                          "2024-01-01": 1,
                          "2024-01-02": 2,
                          "2024-01-03": 2,
                          "2024-01-04": 5,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            processId: 'process8sdfaaaa',
            processName: "Process 2",
            totalHours: 15,
            dateHours: {
              "2024-01-06": 4,
              "2024-01-12": 3,
              "2024-01-14": 4,
              "2024-01-22": 4,
            },
            subProcesses: [
              {
                subProcessId: '34j43j434dfs',
                subProcessName: "Subprocess 2.1",
                totalHours: 15,
                dateHours: {
                  "2024-01-06": 4,
                  "2024-01-12": 3,
                  "2024-01-14": 4,
                  "2024-01-22": 4,
                },
                tasks: [
                  {
                    taskId: 'sefj3244msusu0',
                    taskName: "Task D",
                    totalHours: 15,
                    dateHours: {
                      "2024-01-06": 4,
                      "2024-01-12": 3,
                      "2024-01-14": 4,
                      "2024-01-22": 4,
                    },
                    agents: [
                      {
                        agentId: 'se34kok3fse32',
                        lastName: "Lars",
                        totalHours: 15,
                        dateHours: {
                          "2024-01-06": 4,
                          "2024-01-12": 3,
                          "2024-01-14": 4,
                          "2024-01-22": 4,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

