import os
import json
from apikeys import openai_api_key

# import streamlit as st
# //TODO: add supabase python
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

import tiktoken

# For asynchronous RPC API interactions
from pysui.sui.sui_clients.sync_client import SuiClient as sync_client
from pysui.sui.sui_config import SuiConfig



my_address='0x570e368db8f66fbf5a06e2c4fcd94bb38a87c864ea37ec1abe640ce3a633c931'
my_gas='0x0b28c1851b198c2a91da379396c616248e64170337a91712421375e84a87c9ee'
receiver_address='0x7d20dcdb2bca4f508ea9613994683eb4e76e9c4ed371169677c1be02aaf0b58e'

# Open API key
os.environ['OPENAI_API_KEY'] = openai_api_key

# Asynchronous client for pysui
# https://pysui.readthedocs.io/en/latest/intro.html#the-client
client = sync_client(SuiConfig.default_config()) # Assumes devnet or testnet

def num_tokens_from_string(string: str, model_name: str) -> int:
    """Returns the number of tokens in a text string."""
    encoding = tiktoken.encoding_for_model(model_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens

    

def sendSui():
    # Send SUI to receiver_address
    # https://pysui.readthedocs.io/en/latest/intro.html#sending-tokens
    result = client.pay_sui_txn( signer=my_address, 
                    input_coins=[my_gas],
                    recipients=[receiver_address],
                    amounts=[recieved_tokens_internal],
                    gas_budget=2000000
                   )
    
    print(f"Sent SUI to receiver_address. Transaction data: {result}")
    return f"Sent SUI to receiver_address. Transaction data: {result['transaction_digest']}"

# pricing

#  ['service', tokens]
def call_agent(prompt: str): 
    # measure
    tokens_we_sent_open_ai=0
    tokens_we_received_open_ai=0
    # calculate
    ai_cost = 0
    other_costs = 0
    service_fee = 0

    prompt_template = PromptTemplate(
        input_variables=['user_message'],
        template='write me a twitter thread based on this hook Hook: {user_message}'
    )

    llm = OpenAI(temperature=0.9)
    title_chain = LLMChain(llm=llm, prompt=prompt_template, verbose=True, output_key='ai_output')

    # measure tokens we received from user
    tokens_we_sent_open_ai += num_tokens_from_string(prompt, 'gpt-3.5-turbo')

    # run the prompts in open ai
    response = title_chain.run(user_message=prompt); 
      
    # measure tokens we sent to user
    tokens_we_received_open_ai += num_tokens_from_string(response['ai_output'], 'gpt-3.5-turbo')

    # calculate costs
    ai_cost = (tokens_we_sent_open_ai  * 1) + (tokens_we_received_open_ai * 1); 
    other_costs = 10; #arbitrary number  
    service_fee = ( ai_cost + other_costs ) * 0.2; 

    data = {
        "message": response['ai_output'],
        "reciept": {
                "openai_cost": ai_cost,
                "other_costs": other_costs,
                "service_fee": service_fee,
                "address": my_address, #sui address
                "terms": "24hrs" #24hrs
        },
    }
    return json.dumps(data)

        # Costs
        # 1. tokens we sent to openAI
        # st.write('Total tokens sent to OpenAI: ', sent_tokens_external)
        # 2. tokens we received from openAI
        # st.write('Total tokens received from OpenAI: ', received_tokens_external)
        # 3. tokens we received from user
        # st.write('Total tokens received from user: ', recieved_tokens_internal)
        # 4. tokens we sent to user
        # st.write('Total tokens sent to user: ', sent_tokens_internal)

        # Use st.asyncio to run async_function
        # result = sendSui()
        # st.write(result)
