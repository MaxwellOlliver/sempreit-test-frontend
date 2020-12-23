import React, { useCallback, useContext, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { CgShoppingBag } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';

import { UserContext } from '../../context/UserContext';
import Button from '../../components/Button';
import ProductModal from '../../components/ProductModal';
import Loader from '../../components/Loader';

import { api } from '../../services/api';
import { Container } from './styles';
import BlackLoader from '../../assets/oval-black.svg';

function Products({ history }) {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState(null);

  const { user, removeToken, token } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('SI_TOKEN');
      const response = await api({
        method: 'get',
        url: '/products',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setNext(response.data.next);
      setProducts(response.data.products);
      setLoading(false);
    })();
  }, []);

  const openEditModal = () => {
    if (selectedProducts.length > 1) {
      toast('Select only one product');
    } else if (selectedProducts.length === 0) {
      toast('Select a product');
    } else {
      const product = products.find((p) => p.id === selectedProducts[0]);
      setSelectedProduct(product);
      setModal(true);
    }
  };
  const openDeleteModal = () => {
    if (selectedProducts.length === 0) {
      toast('Select at least one product');
    } else {
      setDeleteModal(true);
    }
  };

  const logout = () => {
    removeToken();
    history.push('/signin');
  };

  const handleSearchMemoized = useCallback(
    async (q) => {
      const response = await api({
        method: 'get',
        url: `/products?q=${q}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setNext(response.data.next);
      setProducts(response.data.products);
    },
    [token]
  );

  const handleSearch = debounce(handleSearchMemoized, 300);

  const selectDeselect = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts((state) => state.filter((v) => v !== id));
    } else {
      setSelectedProducts((state) => [...state, id]);
    }
  };

  const closeModal = () => {
    if (selectedProduct.id) setSelectedProduct({});

    setModal(false);
  };

  const onDeleteProduct = async () => {
    setDeleteLoading(true);
    await Promise.all(
      selectedProducts.map(
        async (id) =>
          await api({
            method: 'delete',
            url: `/products/${id}`,
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
      )
    );

    setProducts((state) =>
      state.filter((p) => !selectedProducts.includes(p.id) && p)
    );
    setSelectedProducts([]);
    setDeleteModal(false);
    setDeleteLoading(false);
  };

  const getNextProductsMemoized = useCallback(async () => {
    const ul = document.getElementById('product-list');
    const value = (ul.scrollHeight - ul.offsetHeight) * 0.6;

    if (next && ul.scrollTop >= value) {
      const response = await api({
        method: 'get',
        url: next,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setNext(response.data.next);
      setProducts((state) => [...state, ...response.data.products]);
    }
  }, [next, token]);

  const getNextProducts = debounce(getNextProductsMemoized, 300);

  return (
    <Container>
      {loading && <Loader />}
      <nav>
        <div className="title">
          <CgShoppingBag size={25} color="#333" />
          <h3>Products</h3>
        </div>
        <div className="profile">
          <div className="info">
            <h6>{user.name}</h6>
            <span>{user.email}</span>
          </div>
          <button onClick={logout}>logout</button>
        </div>
      </nav>
      <div className="content">
        <section>
          <div className="tools">
            <div className="search">
              <FiSearch size={16} color="#333" />
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Find by description..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="actions">
              <Button
                text="Add new"
                style={{ backgroundColor: '#5fc95d' }}
                onClick={() => setModal(true)}
              />
              <Button
                text="Delete"
                style={{ marginLeft: '20px', backgroundColor: '#f55f5f' }}
                onClick={openDeleteModal}
              />
              <Button
                text="Edit"
                style={{ marginLeft: '20px' }}
                onClick={openEditModal}
              />
            </div>
          </div>
          <label>
            <span>description</span>
            <span>value (BRL)</span>
          </label>
          <ul id="product-list" onScroll={getNextProducts}>
            {products.length === 0 && (
              <li className="no-products">
                <span>no products found</span>
              </li>
            )}
            {products.map((product) => (
              <li
                key={product.id}
                className={
                  selectedProducts.includes(product.id) ? 'selected' : ''
                }
                onClick={() => selectDeselect(product.id)}
                title="Click to select"
              >
                <span>{product.description}</span>
                <span>
                  {Number(product.value).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </li>
            ))}
            {next && (
              <li className="loader">
                <img src={BlackLoader} alt="loader" />
              </li>
            )}
          </ul>
        </section>
        {modal && (
          <ProductModal
            product={selectedProduct}
            productSetter={setProducts}
            closeModal={closeModal}
          />
        )}
        {deleteModal && (
          <div className="modal-container">
            <div className="modal">
              <h3>
                You will delete {selectedProducts.length} item
                {selectedProducts.length > 1 && 's'}. Are you sure?
              </h3>
              <div className="row" style={{ display: 'flex' }}>
                <Button
                  text="I'm sure!"
                  onClick={onDeleteProduct}
                  style={{ backgroundColor: '#f55f5f' }}
                  isLoading={deleteLoading}
                />
                <Button text="Go back" onClick={() => setDeleteModal(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Products;
