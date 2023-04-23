module anything::agent_marketplace {

    //create an agent listing
    use sui::tx_context::{Self, TxContext};
    // use sui::clock::{Self, Clock};
    use std::ascii::{Self, String};
    use sui::object::{Self, UID};
    use sui::transfer;

    struct Agent has key, store {
        id: UID,
        name: String,
        // created_at: String,
        description: String,
        thumbnail: String,
        api_url: String,
        marketing_url: String, 
        // handle: String,
        // current_version: String,
        // current_version_id: UID, 
       
        // models: String,
        // thumbnail: String,
        // handle: String, 
        // status: String,
        // api_url: String,
        // price: u64,
        // vendor: UID,
        // host: UID,
        // license: String,
        // status: String
    }

    // struct AgentVersion has key, store {
    //     id: UID,
    //     agent: UID,
    //     version: String,
    //     // created_at: String, 
    //     // name: String, 
    //     // description: String,
    //     // models: String,
    //     // thumbnail: String,
    //     // handle: String,
    //     // status: String,
    //     // api_url: String,
    //     // price: u64,
    //     // vendor: UID,
    //     // host: UID,
    //     // license: String,
    //     // status: String
    // }

    //create an agent and an agent version
     fun new(
        name: vector<u8>,
        description: vector<u8>,
        thumbnail: vector<u8>,
        api_url: vector<u8>,
        marketing_url: vector<u8>,
        ctx: &mut TxContext
      ): Agent {
        Agent {
            id: object::new(ctx),
            name: ascii::string(name),
            description: ascii::string(description),
            thumbnail: ascii::string(thumbnail),
            api_url: ascii::string(api_url),
            marketing_url: ascii::string(marketing_url),
            }
    }

    // fun newVersion(
    //     agent: UID,
    //     version: vector<u8>,
    //     ctx: &mut TxContext
    //   ): AgentVersion {
    //     AgentVersion {
    //         id: object::new(ctx),
    //         agent: agent,
    //         version: ascii::string(version),
    //         }
    // }

    public fun get_agent(self: &Agent): (String, String, String, String, String) {
        (self.name, self.description, self.thumbnail, self.api_url, self.marketing_url)
    }
 
    public entry fun create(
            name: vector<u8>,
            description: vector<u8>,
            thumbnail: vector<u8>,
            api_url: vector<u8>,
            marketing_url: vector<u8>,
        ctx: &mut TxContext) {
            let agent = new(name, description, thumbnail, api_url, marketing_url, ctx);
            // let version: AgentVersion = newVersion(agent.id, version, ctx);
            transfer::transfer(agent, tx_context::sender(ctx)); //TODO: probably make it a sub object
            //  transfer::transfer(version, tx_context::sender(ctx))
        }
}


#[test_only]
module anything::agent_tests {

    use sui::test_scenario;
    use anything::agent_marketplace::{Self, Agent, get_agent};
    use std::ascii::{Self};

    #[test]
    fun test_create() {
    let owner = @0x1;
    // Create a Agent and transfer it to @owner.
    let scenario_val = test_scenario::begin(owner);
    let scenario = &mut scenario_val;
    {
        let ctx = test_scenario::ctx(scenario);
        agent_marketplace::create(
        b"Lincoln",
        b"General Legal Advise with an old school charm",
        b"https://ethicsalarms.files.wordpress.com/2014/10/lincoln-in-trial.jpg%3Fw%3D500",
        b"localhost:8080",
        b"localhost:3000",
        ctx);
    };

    // Check that @not_owner does not own the just-created ColorObject.
    let not_owner = @0x2;
    test_scenario::next_tx(scenario, not_owner);
    {
        assert!(!test_scenario::has_most_recent_for_sender<Agent>(scenario), 0);
    };
    // Check that @owner indeed owns the just-created ColorObject.
    // Also checks the value fields of the object.
    test_scenario::next_tx(scenario, owner);
    {
        let object = test_scenario::take_from_sender<Agent>(scenario);
        
        let (
        name,
        description, 
        thumbnail,
        api_url,
        marketing_url
        ) = get_agent(&object);

        assert!(name == ascii::string(b"Lincoln") && 
        description == ascii::string(b"General Legal Advise with an old school charm") &&
        thumbnail == ascii::string(b"https://ethicsalarms.files.wordpress.com/2014/10/lincoln-in-trial.jpg%3Fw%3D500") &&
        api_url == ascii::string(b"localhost:8080") &&
        marketing_url == ascii::string(b"localhost:3000")
        , 0);

    test_scenario::return_to_sender(scenario, object);
    };
    test_scenario::end(scenario_val);
    }
}
