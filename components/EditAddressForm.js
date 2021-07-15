import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/EditAddressForm.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Button,
  Col,
  Row,
  ControlLabel,
  Card,
  Alert,
} from "react-bootstrap";

const EditAddressForm = ({ user, address, updateAddress }) => {
  const router = useRouter();

  const [street_address, setStreetAddress] = useState("");
  const [apartment_address, setApartmentAddress] = useState("");
  const [state_or_province, setState_or_province] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [address_default, setDefault] = useState(false);
  const [address_type, setAddressType] = useState("");

  useEffect(() => {
    //   LINK if address is not null update options
    if (address != null) {
      setStreetAddress(address.street_address);
      setApartmentAddress(address.apartment_address);
      setState_or_province(address.state_or_province);
      setCountry(address.country);
      setZip(address.zip);
      setDefault(address.default);
      setAddressType(address.address_type);
    }
  }, []);

  const body = JSON.stringify({
    street_address,
    apartment_address,
    state_or_province,
    country,
    zip,
    address_type,
  });

  const updateAddressHandler = async (e) => {
    e.preventDefault();
    var change_default = true;
    if (address_default == address.default) {
      change_default = false;
    }

    await updateAddress(body, change_default, address_default);
    router.push(`/account/${user.id}/manage`);
  };

  return address == null ? (
    <div></div>
  ) : (
    <Container>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>Address</Card.Header>
        <Card.Body>
          <Form className={styles.form}>
            <Form.Group
              size="lg"
              controlId="street_address"
              className={styles.formGroup}
            >
              <Form.Label className={styles.formLabel}>
                Street Address
              </Form.Label>
              <Form.Control
                className={styles.formControl}
                autoFocus
                type="text"
                value={street_address}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              size="lg"
              controlId="apartment_address"
              className={styles.formGroup}
            >
              <Form.Label className={styles.formLabel}>Apartment</Form.Label>
              <Form.Control
                className={styles.formControl}
                type="text"
                value={apartment_address}
                onChange={(e) => setApartmentAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              size="lg"
              controlId="state_or_province"
              className={styles.formGroup}
            >
              <Form.Label className={styles.formLabel}>
                State/Province
              </Form.Label>
              <Form.Control
                className={styles.formControl}
                type="text"
                value={state_or_province}
                onChange={(e) => setState_or_province(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              size="lg"
              controlId="country"
              className={styles.formGroup}
            >
              <Form.Label className={styles.formLabel}>Country</Form.Label>
              <Form.Control
                className={styles.formControl}
                autoFocus
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Form.Group size="lg" controlId="zip" className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Zip Code</Form.Label>
              <Form.Control
                className={styles.formControl}
                autoFocus
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              size="lg"
              controlId="address_default"
              className={styles.formGroup}
            >
              <div className="mb-3">
                <Form.Check type="checkbox">
                  <Form.Check.Input
                    type="checkbox"
                    isValid
                    onChange={() => setDefault(!address_default)}
                    checked={address_default}
                  />
                  <Form.Check.Label className={styles.checkboxLabel}>
                    Set this address as default
                  </Form.Check.Label>
                </Form.Check>
              </div>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer className={styles.cardFooter}>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Button
                onClick={updateAddressHandler}
                variant="danger"
                size="lg"
                className={styles.cardFooterButtonDelete}
              >
                Delete
              </Button>
            </Col>

            <Col xs={6} sm={6} md={6} lg={6}>
              <Button
                onClick={(e) => {
                  updateAddressHandler(e);
                }}
                size="lg"
                className={styles.cardFooterButton}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default EditAddressForm;
