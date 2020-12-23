import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FiPlus, FiEdit } from 'react-icons/fi';
import { UserContext } from '../../context/UserContext';

import Input from '../Input';
import Button from '../Button';

import { api } from '../../services/api';
import { Container } from './styles';

function ProductModal({ product, closeModal, productSetter: setProducts }) {
  const [description, setDescription] = useState(product?.description || '');
  const [value, setValue] = useState(product?.value || '');
  const [errors, setErrors] = useState({
    description: null,
    value: null,
  });
  const [loading, setLoading] = useState(false);

  const isEditing = !!product?.id;

  const { token } = useContext(UserContext);

  const handleChangeDesc = (text) => {
    if (errors.description)
      setErrors((state) => ({ ...state, description: null }));

    setDescription(text);
  };

  const handleChangeValue = (text) => {
    if (errors.value) setErrors((state) => ({ ...state, value: null }));

    setValue(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description) {
      setErrors((state) => ({
        ...state,
        description: "Please, type product's description",
      }));
      return;
    }

    if (!value) {
      setErrors((state) => ({
        ...state,
        value: "Please, type product's value",
      }));
      return;
    }

    if (Number.isNaN(Number(value))) {
      setErrors((state) => ({
        ...state,
        value: 'Please, type a valid number',
      }));
      return;
    }

    setLoading(true);
    const response = await api({
      method: isEditing ? 'put' : 'post',
      url: isEditing ? `/products/${product.id}` : '/products',
      data: {
        description,
        value: Number(value),
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (isEditing) {
      setProducts((state) =>
        state.map((p) => {
          if (p.id === response.data.id) {
            return response.data;
          }

          return p;
        })
      );
    } else {
      setProducts((state) => [response.data, ...state]);
    }

    closeModal();
  };

  return (
    <Container>
      <div className="modal">
        <form onSubmit={handleSubmit}>
          {!isEditing ? (
            <div className="title">
              <FiPlus size={20} color="#333" />
              <h3>Add new Product</h3>
            </div>
          ) : (
            <div className="title">
              <FiEdit size={20} color="#333" />
              <h3>Update a product</h3>
            </div>
          )}
          <Input
            name="description"
            placeholder="Description"
            value={description}
            error={errors.description}
            setValue={handleChangeDesc}
          />
          <div className="row">
            <Input
              type="number"
              name="value"
              placeholder="Value"
              value={String(value)}
              error={errors.value}
              setValue={handleChangeValue}
              min={0}
              step={0.01}
            />
            <div className="column">
              <span>Output value (BRL)</span>
              <input
                type="text"
                value={Number(value).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <Button
              type="submit"
              isLoading={loading}
              text={isEditing ? 'Update' : 'Create'}
              style={{ backgroundColor: '#5fc95d' }}
            />
            <Button text="Go back" onClick={closeModal} />
          </div>
        </form>
      </div>
    </Container>
  );
}

ProductModal.propTypes = {
  product: PropTypes.object,
  productSetter: PropTypes.func,
  closeModal: PropTypes.func,
};

export default ProductModal;
