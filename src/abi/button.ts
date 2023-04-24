import {Abi, encodeCall, decodeResult} from "@subsquid/ink-abi"

export const metadata = {
  "source": {
    "hash": "0xb4706830babcc637e707c9939696341a900c7f077a63a57d14ea85700b6e9be6",
    "language": "ink! 4.0.1",
    "compiler": "rustc 1.66.0-nightly",
    "build_info": {
      "build_mode": "Release",
      "cargo_contract_version": "2.0.0",
      "rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
      "wasm_opt_settings": {
        "keep_debug_symbols": false,
        "optimization_passes": "Z"
      }
    }
  },
  "contract": {
    "name": "button",
    "version": "0.1.0",
    "authors": [
      "Cardinal Cryptography"
    ]
  },
  "spec": {
    "constructors": [
      {
        "args": [
          {
            "label": "ticket_token",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 1
            }
          },
          {
            "label": "reward_token",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 1
            }
          },
          {
            "label": "marketplace",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 1
            }
          },
          {
            "label": "button_lifetime",
            "type": {
              "displayName": [
                "BlockNumber"
              ],
              "type": 0
            }
          },
          {
            "label": "scoring",
            "type": {
              "displayName": [
                "Scoring"
              ],
              "type": 7
            }
          }
        ],
        "docs": [],
        "label": "new",
        "payable": false,
        "returnType": {
          "displayName": [
            "ink_primitives",
            "ConstructorResult"
          ],
          "type": 8
        },
        "selector": "0x9bae9d5e"
      }
    ],
    "docs": [],
    "events": [
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "reward_token",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 1
            }
          },
          {
            "docs": [],
            "indexed": true,
            "label": "ticket_token",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 1
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "start",
            "type": {
              "displayName": [
                "BlockNumber"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "deadline",
            "type": {
              "displayName": [
                "BlockNumber"
              ],
              "type": 0
            }
          }
        ],
        "docs": [
          " Event emitted when TheButton is created"
        ],
        "label": "ButtonCreated"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "by",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 1
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "when",
            "type": {
              "displayName": [
                "BlockNumber"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "score",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          }
        ],
        "docs": [
          " Event emitted when TheButton is pressed"
        ],
        "label": "ButtonPressed"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": false,
            "label": "when",
            "type": {
              "displayName": [
                "BlockNumber"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": true,
            "label": "reward_token",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 1
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "to",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 1
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "amount",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          }
        ],
        "docs": [
          " Event emitted when a reward token is minted to a players account",
          "",
          " Could be a regular player or the Pressiah"
        ],
        "label": "RewardMinted"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": false,
            "label": "when",
            "type": {
              "displayName": [
                "BlockNumber"
              ],
              "type": 0
            }
          }
        ],
        "docs": [
          " Event emitted when the finished game is reset and pressiah is rewarded"
        ],
        "label": "GameReset"
      },
      {
        "args": [],
        "docs": [],
        "label": "Halted"
      },
      {
        "args": [],
        "docs": [],
        "label": "Resumed"
      }
    ],
    "lang_error": {
      "displayName": [
        "ink",
        "LangError"
      ],
      "type": 10
    },
    "messages": [
      {
        "args": [],
        "docs": [
          " Returns the current deadline",
          "",
          " Deadline is the block number at which the game will end if there are no more participants"
        ],
        "label": "deadline",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 11
        },
        "selector": "0x1f48bede"
      },
      {
        "args": [],
        "docs": [
          " Returns the curent round number"
        ],
        "label": "round",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0x11d6557e"
      },
      {
        "args": [],
        "docs": [
          " Returns the buttons status"
        ],
        "label": "is_dead",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 13
        },
        "selector": "0x958a890a"
      },
      {
        "args": [],
        "docs": [
          " Returns the last player who pressed the button.",
          " If button is dead, this is The Pressiah."
        ],
        "label": "last_presser",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 14
        },
        "selector": "0x713e8f6c"
      },
      {
        "args": [],
        "docs": [
          " Returns the current access control contract address"
        ],
        "label": "access_control",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 16
        },
        "selector": "0xf8e6bc11"
      },
      {
        "args": [],
        "docs": [
          " Returns address of the game's reward token"
        ],
        "label": "reward_token",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 16
        },
        "selector": "0x0b067d01"
      },
      {
        "args": [],
        "docs": [
          " Returns address of the game's ticket token"
        ],
        "label": "ticket_token",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 16
        },
        "selector": "0xda49c9d7"
      },
      {
        "args": [],
        "docs": [
          " Returns the address of the marketplace for exchanging this game's rewards for tickets."
        ],
        "label": "marketplace",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 16
        },
        "selector": "0x980bd6ab"
      },
      {
        "args": [],
        "docs": [
          " Returns own code hash"
        ],
        "label": "code_hash",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 17
        },
        "selector": "0xbd69cea7"
      },
      {
        "args": [],
        "docs": [
          " Presses the button",
          "",
          " If called on alive button, instantaneously mints reward tokens to the caller"
        ],
        "label": "press",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 28
        },
        "selector": "0x55d7a21d"
      },
      {
        "args": [],
        "docs": [
          " Resets the game",
          "",
          " Erases the storage and pays award to the Pressiah",
          " Can be called by any account on behalf of a player",
          " Can only be called after button's deadline"
        ],
        "label": "reset",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 28
        },
        "selector": "0xdbd37e6c"
      },
      {
        "args": [
          {
            "label": "new_access_control",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 1
            }
          }
        ],
        "docs": [
          " Sets new access control contract address",
          "",
          " Should only be called by the contract Admin",
          " Implementing contract is responsible for setting up proper AccessControl"
        ],
        "label": "set_access_control",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 28
        },
        "selector": "0x5c864ac6"
      },
      {
        "args": [
          {
            "label": "new_button_lifetime",
            "type": {
              "displayName": [
                "BlockNumber"
              ],
              "type": 0
            }
          }
        ],
        "docs": [
          " Sets button lifetime to a new value",
          "",
          " Can only be called by the contract admin"
        ],
        "label": "set_button_lifetime",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 28
        },
        "selector": "0xb98de9cc"
      },
      {
        "args": [],
        "docs": [
          " Terminates the contract",
          "",
          " Should only be called by the contract Admin"
        ],
        "label": "terminate",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 28
        },
        "selector": "0x476d839f"
      },
      {
        "args": [
          {
            "label": "code_hash",
            "type": {
              "displayName": [],
              "type": 2
            }
          },
          {
            "label": "callback",
            "type": {
              "displayName": [
                "Option"
              ],
              "type": 30
            }
          }
        ],
        "docs": [
          " Upgrades contract code"
        ],
        "label": "set_code",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 28
        },
        "selector": "0x694fb50f"
      }
    ]
  },
  "storage": {
    "root": {
      "layout": {
        "struct": {
          "fields": [
            {
              "layout": {
                "root": {
                  "layout": {
                    "struct": {
                      "fields": [
                        {
                          "layout": {
                            "leaf": {
                              "key": "0x44415441",
                              "ty": 0
                            }
                          },
                          "name": "button_lifetime"
                        },
                        {
                          "layout": {
                            "enum": {
                              "dispatchKey": "0x44415441",
                              "name": "Option",
                              "variants": {
                                "0": {
                                  "fields": [],
                                  "name": "None"
                                },
                                "1": {
                                  "fields": [
                                    {
                                      "layout": {
                                        "leaf": {
                                          "key": "0x44415441",
                                          "ty": 1
                                        }
                                      },
                                      "name": "0"
                                    }
                                  ],
                                  "name": "Some"
                                }
                              }
                            }
                          },
                          "name": "last_presser"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0x44415441",
                              "ty": 0
                            }
                          },
                          "name": "last_press"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0x44415441",
                              "ty": 4
                            }
                          },
                          "name": "total_rewards"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0x44415441",
                              "ty": 4
                            }
                          },
                          "name": "presses"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0x44415441",
                              "ty": 1
                            }
                          },
                          "name": "reward_token"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0x44415441",
                              "ty": 1
                            }
                          },
                          "name": "ticket_token"
                        },
                        {
                          "layout": {
                            "struct": {
                              "fields": [
                                {
                                  "layout": {
                                    "struct": {
                                      "fields": [
                                        {
                                          "layout": {
                                            "leaf": {
                                              "key": "0x44415441",
                                              "ty": 1
                                            }
                                          },
                                          "name": "account_id"
                                        }
                                      ],
                                      "name": "CallBuilder"
                                    }
                                  },
                                  "name": "inner"
                                }
                              ],
                              "name": "AccessControlRef"
                            }
                          },
                          "name": "access_control"
                        },
                        {
                          "layout": {
                            "struct": {
                              "fields": [
                                {
                                  "layout": {
                                    "struct": {
                                      "fields": [
                                        {
                                          "layout": {
                                            "leaf": {
                                              "key": "0x44415441",
                                              "ty": 1
                                            }
                                          },
                                          "name": "account_id"
                                        }
                                      ],
                                      "name": "CallBuilder"
                                    }
                                  },
                                  "name": "inner"
                                }
                              ],
                              "name": "MarketplaceRef"
                            }
                          },
                          "name": "marketplace"
                        },
                        {
                          "layout": {
                            "enum": {
                              "dispatchKey": "0x44415441",
                              "name": "Scoring",
                              "variants": {
                                "0": {
                                  "fields": [],
                                  "name": "EarlyBirdSpecial"
                                },
                                "1": {
                                  "fields": [],
                                  "name": "BackToTheFuture"
                                },
                                "2": {
                                  "fields": [],
                                  "name": "ThePressiahCometh"
                                }
                              }
                            }
                          },
                          "name": "scoring"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0x44415441",
                              "ty": 5
                            }
                          },
                          "name": "round"
                        }
                      ],
                      "name": "Data"
                    }
                  },
                  "root_key": "0x44415441"
                }
              },
              "name": "data"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0x48414c54",
                              "ty": 6
                            }
                          },
                          "root_key": "0x48414c54"
                        }
                      },
                      "name": "halted"
                    }
                  ],
                  "name": "HaltableData"
                }
              },
              "name": "halted"
            }
          ],
          "name": "ButtonGame"
        }
      },
      "root_key": "0x00000000"
    }
  },
  "types": [
    {
      "id": 0,
      "type": {
        "def": {
          "primitive": "u32"
        }
      }
    },
    {
      "id": 1,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 2,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "AccountId"
        ]
      }
    },
    {
      "id": 2,
      "type": {
        "def": {
          "array": {
            "len": 32,
            "type": 3
          }
        }
      }
    },
    {
      "id": 3,
      "type": {
        "def": {
          "primitive": "u8"
        }
      }
    },
    {
      "id": 4,
      "type": {
        "def": {
          "primitive": "u128"
        }
      }
    },
    {
      "id": 5,
      "type": {
        "def": {
          "primitive": "u64"
        }
      }
    },
    {
      "id": 6,
      "type": {
        "def": {
          "primitive": "bool"
        }
      }
    },
    {
      "id": 7,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "EarlyBirdSpecial"
              },
              {
                "index": 1,
                "name": "BackToTheFuture"
              },
              {
                "index": 2,
                "name": "ThePressiahCometh"
              }
            ]
          }
        },
        "path": [
          "button",
          "button_game",
          "Scoring"
        ]
      }
    },
    {
      "id": 8,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 9
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 9,
      "type": {
        "def": {
          "tuple": []
        }
      }
    },
    {
      "id": 10,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 1,
                "name": "CouldNotReadInput"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "LangError"
        ]
      }
    },
    {
      "id": 11,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 0
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 0
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 12,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 5
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 5
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 13,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 6
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 6
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 14,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 15
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 15
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 15,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 1
                  }
                ],
                "index": 1,
                "name": "Some"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 1
          }
        ],
        "path": [
          "Option"
        ]
      }
    },
    {
      "id": 16,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 1
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 1
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 17,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 18
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 18
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 18,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 19
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 20
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 19
          },
          {
            "name": "E",
            "type": 20
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 19,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 2,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "Hash"
        ]
      }
    },
    {
      "id": 20,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 21,
                    "typeName": "HaltableError"
                  }
                ],
                "index": 0,
                "name": "HaltableError"
              },
              {
                "index": 1,
                "name": "BeforeDeadline"
              },
              {
                "index": 2,
                "name": "AfterDeadline"
              },
              {
                "fields": [
                  {
                    "type": 23,
                    "typeName": "Role"
                  }
                ],
                "index": 3,
                "name": "MissingRole"
              },
              {
                "fields": [
                  {
                    "type": 25,
                    "typeName": "PSP22Error"
                  }
                ],
                "index": 4,
                "name": "PSP22Error"
              },
              {
                "fields": [
                  {
                    "type": 22,
                    "typeName": "String"
                  }
                ],
                "index": 5,
                "name": "InkEnvError"
              },
              {
                "index": 6,
                "name": "CantRetrieveOwnCodeHash"
              },
              {
                "index": 7,
                "name": "Arithmethic"
              },
              {
                "fields": [
                  {
                    "type": 27,
                    "typeName": "MarketplaceError"
                  }
                ],
                "index": 8,
                "name": "MarketplaceError"
              },
              {
                "fields": [
                  {
                    "type": 10,
                    "typeName": "LangError"
                  }
                ],
                "index": 9,
                "name": "ContractCall"
              }
            ]
          }
        },
        "path": [
          "button",
          "errors",
          "GameError"
        ]
      }
    },
    {
      "id": 21,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "InHaltedState"
              },
              {
                "index": 1,
                "name": "NotInHaltedState"
              },
              {
                "fields": [
                  {
                    "type": 22,
                    "typeName": "String"
                  }
                ],
                "index": 2,
                "name": "Custom"
              }
            ]
          }
        },
        "path": [
          "shared_traits",
          "haltable",
          "HaltableError"
        ]
      }
    },
    {
      "id": 22,
      "type": {
        "def": {
          "primitive": "str"
        }
      }
    },
    {
      "id": 23,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 19,
                    "typeName": "Hash"
                  }
                ],
                "index": 0,
                "name": "Initializer"
              },
              {
                "fields": [
                  {
                    "type": 1,
                    "typeName": "AccountId"
                  }
                ],
                "index": 1,
                "name": "Admin"
              },
              {
                "fields": [
                  {
                    "type": 1,
                    "typeName": "AccountId"
                  },
                  {
                    "type": 24,
                    "typeName": "[u8; 4]"
                  }
                ],
                "index": 2,
                "name": "Custom"
              }
            ]
          }
        },
        "path": [
          "access_control",
          "roles",
          "Role"
        ]
      }
    },
    {
      "id": 24,
      "type": {
        "def": {
          "array": {
            "len": 4,
            "type": 3
          }
        }
      }
    },
    {
      "id": 25,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 26,
                    "typeName": "String"
                  }
                ],
                "index": 0,
                "name": "Custom"
              },
              {
                "index": 1,
                "name": "InsufficientBalance"
              },
              {
                "index": 2,
                "name": "InsufficientAllowance"
              },
              {
                "index": 3,
                "name": "ZeroRecipientAddress"
              },
              {
                "index": 4,
                "name": "ZeroSenderAddress"
              },
              {
                "fields": [
                  {
                    "type": 26,
                    "typeName": "String"
                  }
                ],
                "index": 5,
                "name": "SafeTransferCheckFailed"
              }
            ]
          }
        },
        "path": [
          "openbrush_contracts",
          "traits",
          "errors",
          "psp22",
          "PSP22Error"
        ]
      }
    },
    {
      "id": 26,
      "type": {
        "def": {
          "sequence": {
            "type": 3
          }
        }
      }
    },
    {
      "id": 27,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 21,
                    "typeName": "HaltableError"
                  }
                ],
                "index": 0,
                "name": "HaltableError"
              },
              {
                "fields": [
                  {
                    "type": 23,
                    "typeName": "Role"
                  }
                ],
                "index": 1,
                "name": "MissingRole"
              },
              {
                "fields": [
                  {
                    "type": 22,
                    "typeName": "String"
                  }
                ],
                "index": 2,
                "name": "ContractCall"
              },
              {
                "fields": [
                  {
                    "type": 25,
                    "typeName": "PSP22Error"
                  }
                ],
                "index": 3,
                "name": "PSP22TokenCall"
              },
              {
                "index": 4,
                "name": "MaxPriceExceeded"
              },
              {
                "index": 5,
                "name": "MarketplaceEmpty"
              }
            ]
          }
        },
        "path": [
          "marketplace",
          "marketplace",
          "Error"
        ]
      }
    },
    {
      "id": 28,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 29
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 29
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 29,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 20
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 9
          },
          {
            "name": "E",
            "type": 20
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 30,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 24
                  }
                ],
                "index": 1,
                "name": "Some"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 24
          }
        ],
        "path": [
          "Option"
        ]
      }
    }
  ],
  "version": "4"
}

const _abi = new Abi(metadata)

export function decodeEvent(hex: string): Event {
    return _abi.decodeEvent(hex)
}

export function decodeMessage(hex: string): Message {
    return _abi.decodeMessage(hex)
}

export function decodeConstructor(hex: string): Constructor {
    return _abi.decodeConstructor(hex)
}

export interface Chain {
    client: {
        call: <T=any>(method: string, params?: unknown[]) => Promise<T>
    }
}

export interface ChainContext {
    _chain: Chain
}

export class Contract {
    constructor(private ctx: ChainContext, private address: string, private blockHash?: string) { }

    deadline(): Promise<Result<BlockNumber, LangError>> {
        return this.stateCall('0x1f48bede', [])
    }

    round(): Promise<Result<bigint, LangError>> {
        return this.stateCall('0x11d6557e', [])
    }

    is_dead(): Promise<Result<boolean, LangError>> {
        return this.stateCall('0x958a890a', [])
    }

    last_presser(): Promise<Result<(AccountId | undefined), LangError>> {
        return this.stateCall('0x713e8f6c', [])
    }

    access_control(): Promise<Result<AccountId, LangError>> {
        return this.stateCall('0xf8e6bc11', [])
    }

    reward_token(): Promise<Result<AccountId, LangError>> {
        return this.stateCall('0x0b067d01', [])
    }

    ticket_token(): Promise<Result<AccountId, LangError>> {
        return this.stateCall('0xda49c9d7', [])
    }

    marketplace(): Promise<Result<AccountId, LangError>> {
        return this.stateCall('0x980bd6ab', [])
    }

    code_hash(): Promise<Result<Result<Uint8Array, GameError>, LangError>> {
        return this.stateCall('0xbd69cea7', [])
    }

    private async stateCall<T>(selector: string, args: any[]): Promise<T> {
        let input = _abi.encodeMessageInput(selector, args)
        let data = encodeCall(this.address, input)
        let result = await this.ctx._chain.client.call('state_call', ['ContractsApi_call', data, this.blockHash])
        let value = decodeResult(result)
        return _abi.decodeMessageOutput(selector, value)
    }
}

export type Event = Event_ButtonCreated | Event_ButtonPressed | Event_RewardMinted | Event_GameReset | Event_Halted | Event_Resumed

export interface Event_ButtonCreated {
    __kind: 'ButtonCreated'
    rewardToken: AccountId
    ticketToken: AccountId
    start: BlockNumber
    deadline: BlockNumber
}

export interface Event_ButtonPressed {
    __kind: 'ButtonPressed'
    by: AccountId
    when: BlockNumber
    score: Balance
}

export interface Event_RewardMinted {
    __kind: 'RewardMinted'
    when: BlockNumber
    rewardToken: AccountId
    to: AccountId
    amount: Balance
}

export interface Event_GameReset {
    __kind: 'GameReset'
    when: BlockNumber
}

export interface Event_Halted {
    __kind: 'Halted'
}

export interface Event_Resumed {
    __kind: 'Resumed'
}

export type Message = Message_deadline | Message_round | Message_is_dead | Message_last_presser | Message_access_control | Message_reward_token | Message_ticket_token | Message_marketplace | Message_code_hash | Message_press | Message_reset | Message_set_access_control | Message_set_button_lifetime | Message_terminate | Message_set_code

/**
 *  Returns the current deadline
 * 
 *  Deadline is the block number at which the game will end if there are no more participants
 */
export interface Message_deadline {
    __kind: 'deadline'
}

/**
 *  Returns the curent round number
 */
export interface Message_round {
    __kind: 'round'
}

/**
 *  Returns the buttons status
 */
export interface Message_is_dead {
    __kind: 'is_dead'
}

/**
 *  Returns the last player who pressed the button.
 *  If button is dead, this is The Pressiah.
 */
export interface Message_last_presser {
    __kind: 'last_presser'
}

/**
 *  Returns the current access control contract address
 */
export interface Message_access_control {
    __kind: 'access_control'
}

/**
 *  Returns address of the game's reward token
 */
export interface Message_reward_token {
    __kind: 'reward_token'
}

/**
 *  Returns address of the game's ticket token
 */
export interface Message_ticket_token {
    __kind: 'ticket_token'
}

/**
 *  Returns the address of the marketplace for exchanging this game's rewards for tickets.
 */
export interface Message_marketplace {
    __kind: 'marketplace'
}

/**
 *  Returns own code hash
 */
export interface Message_code_hash {
    __kind: 'code_hash'
}

/**
 *  Presses the button
 * 
 *  If called on alive button, instantaneously mints reward tokens to the caller
 */
export interface Message_press {
    __kind: 'press'
}

/**
 *  Resets the game
 * 
 *  Erases the storage and pays award to the Pressiah
 *  Can be called by any account on behalf of a player
 *  Can only be called after button's deadline
 */
export interface Message_reset {
    __kind: 'reset'
}

/**
 *  Sets new access control contract address
 * 
 *  Should only be called by the contract Admin
 *  Implementing contract is responsible for setting up proper AccessControl
 */
export interface Message_set_access_control {
    __kind: 'set_access_control'
    newAccessControl: AccountId
}

/**
 *  Sets button lifetime to a new value
 * 
 *  Can only be called by the contract admin
 */
export interface Message_set_button_lifetime {
    __kind: 'set_button_lifetime'
    newButtonLifetime: BlockNumber
}

/**
 *  Terminates the contract
 * 
 *  Should only be called by the contract Admin
 */
export interface Message_terminate {
    __kind: 'terminate'
}

/**
 *  Upgrades contract code
 */
export interface Message_set_code {
    __kind: 'set_code'
    codeHash: Uint8Array
    callback: (Uint8Array | undefined)
}

export type Constructor = Constructor_new

export interface Constructor_new {
    __kind: 'new'
    ticketToken: AccountId
    rewardToken: AccountId
    marketplace: AccountId
    buttonLifetime: BlockNumber
    scoring: Scoring
}

export type BlockNumber = number

export type LangError = LangError_CouldNotReadInput

export interface LangError_CouldNotReadInput {
    __kind: 'CouldNotReadInput'
}

export type AccountId = Uint8Array

export type GameError = GameError_HaltableError | GameError_BeforeDeadline | GameError_AfterDeadline | GameError_MissingRole | GameError_PSP22Error | GameError_InkEnvError | GameError_CantRetrieveOwnCodeHash | GameError_Arithmethic | GameError_MarketplaceError | GameError_ContractCall

export interface GameError_HaltableError {
    __kind: 'HaltableError'
    value: HaltableError
}

export interface GameError_BeforeDeadline {
    __kind: 'BeforeDeadline'
}

export interface GameError_AfterDeadline {
    __kind: 'AfterDeadline'
}

export interface GameError_MissingRole {
    __kind: 'MissingRole'
    value: Role
}

export interface GameError_PSP22Error {
    __kind: 'PSP22Error'
    value: PSP22Error
}

export interface GameError_InkEnvError {
    __kind: 'InkEnvError'
    value: string
}

export interface GameError_CantRetrieveOwnCodeHash {
    __kind: 'CantRetrieveOwnCodeHash'
}

export interface GameError_Arithmethic {
    __kind: 'Arithmethic'
}

export interface GameError_MarketplaceError {
    __kind: 'MarketplaceError'
    value: Error
}

export interface GameError_ContractCall {
    __kind: 'ContractCall'
    value: LangError
}

export type Balance = bigint

export type Scoring = Scoring_EarlyBirdSpecial | Scoring_BackToTheFuture | Scoring_ThePressiahCometh

export interface Scoring_EarlyBirdSpecial {
    __kind: 'EarlyBirdSpecial'
}

export interface Scoring_BackToTheFuture {
    __kind: 'BackToTheFuture'
}

export interface Scoring_ThePressiahCometh {
    __kind: 'ThePressiahCometh'
}

export type HaltableError = HaltableError_InHaltedState | HaltableError_NotInHaltedState | HaltableError_Custom

export interface HaltableError_InHaltedState {
    __kind: 'InHaltedState'
}

export interface HaltableError_NotInHaltedState {
    __kind: 'NotInHaltedState'
}

export interface HaltableError_Custom {
    __kind: 'Custom'
    value: string
}

export type Role = Role_Initializer | Role_Admin | Role_Custom

export interface Role_Initializer {
    __kind: 'Initializer'
    value: Uint8Array
}

export interface Role_Admin {
    __kind: 'Admin'
    value: AccountId
}

export interface Role_Custom {
    __kind: 'Custom'
    value: [AccountId, Uint8Array]
}

export type PSP22Error = PSP22Error_Custom | PSP22Error_InsufficientBalance | PSP22Error_InsufficientAllowance | PSP22Error_ZeroRecipientAddress | PSP22Error_ZeroSenderAddress | PSP22Error_SafeTransferCheckFailed

export interface PSP22Error_Custom {
    __kind: 'Custom'
    value: Uint8Array
}

export interface PSP22Error_InsufficientBalance {
    __kind: 'InsufficientBalance'
}

export interface PSP22Error_InsufficientAllowance {
    __kind: 'InsufficientAllowance'
}

export interface PSP22Error_ZeroRecipientAddress {
    __kind: 'ZeroRecipientAddress'
}

export interface PSP22Error_ZeroSenderAddress {
    __kind: 'ZeroSenderAddress'
}

export interface PSP22Error_SafeTransferCheckFailed {
    __kind: 'SafeTransferCheckFailed'
    value: Uint8Array
}

export type Error = Error_HaltableError | Error_MissingRole | Error_ContractCall | Error_PSP22TokenCall | Error_MaxPriceExceeded | Error_MarketplaceEmpty

export interface Error_HaltableError {
    __kind: 'HaltableError'
    value: HaltableError
}

export interface Error_MissingRole {
    __kind: 'MissingRole'
    value: Role
}

export interface Error_ContractCall {
    __kind: 'ContractCall'
    value: string
}

export interface Error_PSP22TokenCall {
    __kind: 'PSP22TokenCall'
    value: PSP22Error
}

export interface Error_MaxPriceExceeded {
    __kind: 'MaxPriceExceeded'
}

export interface Error_MarketplaceEmpty {
    __kind: 'MarketplaceEmpty'
}

export type Result<T, E> = {__kind: 'Ok', value: T} | {__kind: 'Err', value: E}
