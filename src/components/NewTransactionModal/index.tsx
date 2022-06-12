import { FormEvent, useContext, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { api } from "../../services/api";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [type, setType] = useState("deposit");
  const [amount, setAmount] = useState(0)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const {createTransaction} = useTransactions()

 async function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault();
  
    await createTransaction({
      title,
      amount,
      category, 
      type
    })
    setTitle('')
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  return (
    <Modal
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input placeholder="Titulo" value={title} onChange={(e)=>{
          setTitle(e.target.value)
        }} />

        <input placeholder="Valor" value={amount} onChange={(e)=>{
          setAmount(Number(e.target.value))
        }} type="number" />

        <TransactionTypeContainer>
          <RadioBox
            onClick={() => {
              setType("deposit");
            }}
            isActive={type === 'deposit'}
            type="button"
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            onClick={() => {
              setType("withdraw");
            }}
            type="button"
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input placeholder="Categoria" value={category} onChange={
          e => {setCategory(e.target.value)}
        }  />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
